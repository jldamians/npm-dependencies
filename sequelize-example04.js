'use strict'

var Sequelize = require('sequelize');
var Promises = require('bluebird');

var sequelize = new Sequelize(
    'facturactiva-ultimo',
    'root',
    'root',
    {
        dialect: 'mysql',
        logging: console.log,
        host: 'localhost',
        port: 3306,
        timezone: '-05:00',
        dialectOptions: {
            multipleStatements: true
        }
    }
)

var Cliente = sequelize.define(
    'Cliente', 
    {
        idCliente: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true
        },
        nombre: {
          type: Sequelize.STRING(500),
          allowNull: true
        },
        direccion: {
          type: Sequelize.STRING(500),
          allowNull: false
        },
        telefono: {
          type: Sequelize.INTEGER(11),
          allowNull: false
        },
        tipoDocumentoIdentidad: {
          type: Sequelize.STRING(1),
          allowNull: true
        },
        numeroDocumentoIdentidad: {
          type: Sequelize.STRING(15),
          allowNull: true
        },
        emailContacto: {
          type: Sequelize.STRING(500),
          allowNull: true
        },
        emailConfirmado: {
          type: Sequelize.INTEGER(1),
          allowNull: true
        },
        estado: {
          type: Sequelize.STRING(2),
          allowNull: true
        },
        empresaCreacion: {
          type: Sequelize.INTEGER(1),
          allowNull: true
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: '`cliente`',
        classMethods: {
            generate: function(transaction, data) {
                var Model = this;

                return Model.max('idCliente').then(function(id){
                  var idCliente = (id || 0) + 1;

                  console.log('idCliente => ', idCliente);

                  data.idCliente = idCliente;

                  return Model.create(data, {
                    transaction: transaction
                  });
                });
            },
        }
    }
)

var ListClient = [
    ['Jose Beto Damian', 'Calle Inca Roca - Pucallpa', '961887305', 6, '10468887351', 'jlds161089@gmail.com', 1, 'A', 1],
    ['Jose Luis Damian', 'AA.HH. S. Unidos - Pucallpa', '961952104', 6, '10335952141', 'jads17@gmail.com', 1, 'A', 1],
    ['Carlos E. Damian', 'AA.HH. S. Unidos - Pucallpa', '961088008', 6, '12343323890', 'taduda@gmail.com', 1, 'A', 1],
    ['Anani Ayala Paz', 'AA.HH. S#3 Bocanegra - Lima', '992703459', 6, '53735326892', 'any_15@gmail.com', 1, 'A', 1],
]

// variable de control, para el recorrido del origen de datos
var CURRENT_INDEX_PROCESSING = 0;

function insertPersona(dataPersona) {
    return sequelize.transaction(function(transaction){
        var dataSend = {
            nombre: dataPersona[0], 
            direccion: dataPersona[1], 
            telefono: dataPersona[2], 
            tipoDocumentoIdentidad: dataPersona[3], 
            numeroDocumentoIdentidad: dataPersona[4], 
            emailContacto: dataPersona[5], 
            emailConfirmado: dataPersona[6], 
            estado: dataPersona[7], 
            empresaCreacion: dataPersona[8]
        };

        return new Promises(function(resolve) {
            return resolve(Cliente.generate(transaction, dataSend));
        });
    });
}

function getNextDataToInsert() {
  var currentDataProcessing;

  if (CURRENT_INDEX_PROCESSING === ListClient.length) {
    return Promises.resolve();
  }

  currentDataProcessing = ListClient[CURRENT_INDEX_PROCESSING];

  return insertPersona(currentDataProcessing).then(function() {
    console.log('Insertado...'); 

    CURRENT_INDEX_PROCESSING++;

    return getNextDataToInsert();
  }).catch(function() {
    console.log('No Insertado...');

    CURRENT_INDEX_PROCESSING++;

    return getNextDataToInsert();
  });
}

getNextDataToInsert().then(function() {
    console.log('INSERTADO.');
}).catch(function(err){
    console.log('ERROR => ', err);
});

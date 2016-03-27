'use strict';

var Sequelize = require('sequelize');
var Promises = require('bluebird');
var Joi = require('joi');
var fs = require('fs');
var XLSXWriter = require('xlsx-writestream');

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
    ['Carlos E. Damian', 'AA.HH. S. Unidos - Pucallpa', '931088008', 6, '12343323890', 'taduda@gmail.com.pe', 1, 'A', 1],
    ['Anani Ayala Paz', 'AA.HH. S#3 Bocanegra - Lima', '961703459', 6, '53735326892', 'any_15@com', 1, 'A', 1],
];

Joi.validate = Promise.promisify(Joi.validate, Joi);

var schema = Joi.object().keys({
  email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/),
  mobile: Joi.string().regex(/^961\d{6}/),
  ruc: Joi.string().regex(/\d{11}/)
});

var configExcel = {
  PATH: 'error01.xlsx',
  COLS: [
    { width: 30 },
    { width: 30 },
    { width: 15 },
    { width: 25 },
    { width: 30 },
    { width: 20 },
    { width: 15 }
  ],
  ROWS: []
};

// variable de control, para el recorrido del origen de datos
var CURRENT_INDEX_PROCESSING = 0;

// funcion que realiza las insercion
function insertPersona(dataPersona) {
  return Joi.validate({email: dataPersona[5], mobile: dataPersona[2], ruc: dataPersona[4]}, schema).the(function(){
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
  }).catch(function(){
    configExcel.ROWS.push({
      'Nombre': dataPersona[0],
      'Dirección': dataPersona[1],
      'Móvil': dataPersona[2],
      'Tipo Documento Identidad': dataPersona[3],
      'Número Documento Identidad': dataPersona[4],
      'Correo Electrónico': dataPersona[5],
      'Observación': observacion
    });

    return Promises.resolve();
  });
}

function generateExcelError(conf){
  if ( conf.ROWS.length === 0 ) {
    return;
  }

  var writer = new XLSXWriter();

  // After instantiation, you can grab the readstream at any time.
  writer.getReadStream().pipe(fs.createWriteStream(conf.PATH));

  // Optional: Adjust column widths
  writer.defineColumns(conf.COLS)

  // Add some rows
  conf.ROWS.forEach(function(elem) {
    writer.addRow(elem);
  });

  // Finalize the spreadsheet. If you don't do this, the readstream will not end.
  writer.finalize();
}

// funcion recursiva que recorre los datos
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

// ejecucion y control del resultado
getNextDataToInsert().then(function() {
    console.log('INSERTADO.');

    generateExcelError(configExcel);
}).catch(function(err){
    console.log('ERROR => ', err);
});

'use strict'

var Sequelize = require('sequelize')

var sequelize = new Sequelize(
    'facturactiva-service-backup',
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

var Prueba = sequelize.define(
  'Prueba', 
  {
    idprueba: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING(45),
      allowNull: true
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'prueba'
  }
)


Prueba.create({nombre: 'jose luis'}).then(function(result) {
  console.log('idprueba autoIncrement =>', result.idprueba);
});


'use strict'

var Sequelize = require('sequelize')

var sequelize = new Sequelize(
    'bd_rastreo',
    'root',
    '',
    {
        dialect: 'mysql',
        logging: false,
        host: 'localhost',
        port: 3306,
        timezone: '-05:00',
        dialectOptions: {
            multipleStatements: true
        }
    }
)


var Marca = sequelize.define(
    'Marca', 
    {
        idmarca: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        estado: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'marca'
    }
)

module.exports = {
    Marca: Marca
} 
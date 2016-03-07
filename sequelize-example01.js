'use strict'

var Sequelize = require('sequelize')

var sequelize = new Sequelize(
    'bd_rastreo',
    'admintg',
    'app+-*tiger',
    {
        dialect: 'mysql',
        logging: false,
        host: '45.55.199.53',
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

var Modelo = sequelize.define(
    'Modelo', 
    {
        idmodelo: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        idmarca: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(45),
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
        tableName: 'modelo'
    }
)

var Modem = sequelize.define(
    'Modem', 
    {
        idmodem: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        idmodelo: {
            type: Sequelize.INTEGER(11),
            allowNull: false
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
        tableName: 'modem'
    }
)

module.exports = {
    Marca: Marca,
    Modelo: Modelo,
    Modem: Modem
} 
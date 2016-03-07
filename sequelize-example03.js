'use strict'

var db     = require('./sequelize-example01')
var Marca  = db.Marca
var Modelo = db.Modelo
var Modem = db.Modem

Marca.hasMany(
	Modelo, 
	{
		foreignKey: 'idmarca',
		foreignKeyConstraint: true
	}
)

Marca.hasMany(Modelo, { foreignKey: 'idmarca' })
Modelo.belongsTo(Marca, { foreignKey: 'idmarca' })

var data = []

Marca.findAll({include : [Modelo]}).then(function(result) {
	//console.dir(JSON.stringify(result))
    result.forEach(function(elem){
    	data.push({
    		idmarca: elem['dataValues']['idmarca'],
    		nombre: elem['dataValues']['nombre'],
    		estado: elem['dataValues']['estado'],
    		modelos: (function(modelos){
    			var arr = []
    			modelos.forEach(function(el){
    				arr.push({
    					idmodelo: el['dataValues']['idmodelo'],
    					nombre: el['dataValues']['nombre'],
    					estado: el['dataValues']['estado']
    				})
    			})

    			return arr
    		})(elem['dataValues']['Modelos'])
    	})
    })

    console.log('Marca => ', JSON.stringify(data))
})
'use strict'

var Promises = require('bluebird')
var db       = require('./sequelize-example01')

db.Marca.findAll({
	attributes: ['idmarca']
}).then(function(result){
	var procesos = {}

	result.forEach(function(element, index, array){
		procesos['marca' + element['dataValues']['idmarca']] = (db.Marca.findOne({
			attributes: ['nombre'],
			where: {
				idmarca: element['idmarca']
			}
		}))
	})

	return Promises.props(procesos)
}).then(function(infoMarca){
	var info = [] ;

	for (var marca in infoMarca) {
		info.push(infoMarca[marca]['dataValues'])	
	}

	console.log(info)
})





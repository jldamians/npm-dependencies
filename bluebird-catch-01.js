'use strict'

var Promises = require('bluebird')
var db       = require('./sequelize-example01')

var procesos = []

// Agregamos las promesas a un array

procesos.push(
	db.Marca.findOne({
		attributes: ['idmarca', 'nombre'],
		where: {
			idmarca: 1
		}
	})
)

procesos.push(
	db.Marca.findOne({
		attributes: ['idmarca', 'nombre'],
		where: {
			idmarca: 2
		}
	})
)

procesos.push(
	db.Marca.findAll({
		attributes: ['idmarca', 'nombre']
	})
)

// Cuando todas las promesas han sido resueltas, procesamos los resultados de cada una

Promises.all(procesos).then(function(result){
	result.forEach(function(elementParent){
		if ( elementParent.length ) {
			elementParent.forEach(function(elementChild){
				console.log('findAll', elementChild['dataValues'])
			})
		}
		else {
			console.log('findOne', elementParent['dataValues'])
		}
	})
}).catch(function(error){
	console.log(error['message'])
})




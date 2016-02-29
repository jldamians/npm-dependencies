'use strict'

var Promises = require('bluebird')
var db       = require('./sequelize-example01')

var procesos = {}

// Agregamos las promesas al objeto

procesos['cel'] = (
	db.Marca.findOne({
		attributes: ['idmarca', 'nombre'],
		where: {
			idmarca: 1
		}
	})
)

procesos['sky'] = (
	db.Marca.findOne({
		attributes: ['idmarca', 'nombre'],
		where: {
			idmarca: 2
		}
	})
)

procesos['all'] = (
	db.Marca.findAll({
		attributes: ['idmarca', 'nombre']
	})
)

// Cuando todas las promesas han sido resueltas, procesamos los resultados de cada una

Promises.props(procesos).then(function(result){
	if ( 'all' in result ) {
		var dataAll = []

	    result['all'].forEach(function (elementAll) {
	        dataAll.push(elementAll['dataValues']);
	    });

	    console.log('all => ', dataAll)
	}

	if ( 'cel' in result ) {
		console.log('cellocator => ', result['cel']['dataValues'])
	}

	if ( 'sky' in result ) {
		console.log('skypatrol => ', result['sky']['dataValues'])
	}
})




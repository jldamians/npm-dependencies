'use strict';

/*
 * BelongsTo: Se utiliza cuando el "foreign key" de la relacion "uno a uno"
 * existe en el modelo de origen
 */

var db = require('./sequelize-example01');
var Marca = db.Marca;
var Modelo = db.Modelo;
var Modem = db.Modem;

// Indicamos que atributo de la tabla "Marca", es "foreignKey" 
// en el tabla "Modelo"
Marca.hasMany(Modelo, { foreignKey: 'idmarca' });
Modelo.belongsTo(Marca, { foreignKey: 'idmarca' });

Modelo.hasMany(Modem, { foreignKey: 'idmodelo' });
Modem.belongsTo(Modelo, { foreignKey: 'idmodelo' });

Marca.findAll({
    include : [{
    	model: Modelo, 
    	required: true ,
    	on: {
    		'idmarca': {$col: 'Marca.idmarca'}
    	},
    	include: [{
    		model: Modem,
    		required: true,
    		on: {
	    		'idmodelo': {$col: 'Modelos.idmodelo'}
    		}
    	}]
    }],
})/*.then(function(result) {
	console.log(JSON.stringify(result))
})*/
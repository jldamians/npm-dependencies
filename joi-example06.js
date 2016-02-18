'use strict';

var Joi = require('joi');

	var schema = Joi.object().keys({
	    a: Joi.any(),
	    b: Joi.any(),
	    c: Joi.any()
	}).and('b', 'c'); // si estan presentes algunas de estas claves, se evaluara que el resto tambien


	// ejemplo 01 => no pasa nada si excluimos las clave especificadas en "and('b', 'c')"
	var values1 = {
		a: 'value1'
	};

	schema.validate(values1, function(err, value) {
		if ( err ) {
			console.error('Ejemplo 01 => ', err);
		}
		else{
			console.info('Ejemplo 01 => ', value);
		}
	});

	//  ejemplo 02 => saltara un error si solo incluimos una clave (b), debido a que es obligatorio que esten todo o ninguno
	var values2 = {
		a: 'value1',
		b: 'value2'
	};

	schema.validate(values2, function(err, value) {
		if ( err ) {
			console.error('Ejemplo 02 => ', err);
		}
		else{
			console.info('Ejemplo 02 => ', value);
		}
	});
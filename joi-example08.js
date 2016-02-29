'use strict';

var Joi = require('joi');

	var schema = Joi.object().keys({
	    a: Joi.any(),
	    b: Joi.any(),
	    c: Joi.any()
	}).with('c', ['a', 'b']); // solo si la clave 'c' esta siendo validada, evaluara que 'a' y 'b' tambien


	// ejemplo 01 => no pasa nada, puesto que no se esta enviando 'c'
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

	//  ejemplo 02 => saltara un error, puesto que se estan enviando 'c', mas no todas sus dependencias (falta a)
	var values2 = {
		c: 'value1',
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
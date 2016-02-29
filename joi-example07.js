'use strict';

var Joi = require('joi');

	var schema = Joi.object().keys({
	    a: Joi.any(),
	    b: Joi.any(),
	    c: Joi.any()
	}).or('b', 'c'); // alguna de las claves debe estar presente en la validacion


	// ejemplo 01 => saltara un error, debido a que es obligatorio que se ingrese al menos 'b' o 'c', o en el mejor de los casos ambos
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

	//  ejemplo 02 => no pasa nada, puesto que estamos enviado unos de los parametros que se incluyen en "or('b', 'c')"
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
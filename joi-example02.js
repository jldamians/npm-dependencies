'use strict';

var Joi = require('joi');

var schema = Joi.number().integer().min(0).max(65535);

var result = Joi.validate(5535, schema);

if ( result.error ) {
	console.log('[/¡\\] Corregir datos') ;
}
else {
	console.log('[ok] Datos correctos') ;
}

console.log(result) ;


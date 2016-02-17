'use strict';

var Joi = require('joi') ;

var obj01 = Joi.object().keys({
    a: Joi.number().min(1).max(10).integer(),
    b: 'some string'
});

console.log('\n* * * * * * * * * * * * * * * *\n') ;
console.dir(obj01) ;
console.log('\n* * * * * * * * * * * * * * * *\n') ;

obj01.validate({ a: 5 }, function(err, value) {
	if ( err ) {
		console.error('Error de validacion');
	}
	else{
		console.info('Validacion correcta');
	}
});
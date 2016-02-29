'use strict';

var Joi = require('joi');

// plain JS object notation
	var schema1 = {
		a: Joi.string()
	};

	var data1 = {
		a: 'value string'
	};

	Joi.validate(data1, schema1, function(err, value) {
		if ( err ) {
			console.log('[--] Error de esquema =>', err);
		} else {
			console.info('[++] Correcto =>', value);
		}
	});

// Joi.object notation
	var schema2 = Joi.object({
	    a: Joi.boolean()
	});

	schema2.validate(true, function(err, value){
		if ( err ) {
			console.log('[--] Error de esquema =>', err);
		} else {
			console.info('[++] Correcto =>', value);
		}
	});

// Joi.object().keys notation
	// inicial object
	var schema3 = Joi.object().keys({
	    a: Joi.number(),
	    b: Joi.string()
	});

	// complete params
	var schema3extended = schema3.keys({
	    c: Joi.boolean()
	});

	var data3 = {
		a: 1,
		b: 'string',
		c: true
	};

	schema3extended.validate(data3, function(err, value) {
		if ( err ) {
			console.error(err);
		}
		else{
			console.info(value);
		}
	});
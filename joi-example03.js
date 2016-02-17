'use strict';

var Joi = require('joi');

var schema = {
	counter: Joi.number().min(1).max(10).required()
};

// will fail
Joi.validate({counter: 0}, schema, console.error);

// will pass
Joi.validate({counter: 5}, schema, console.info);
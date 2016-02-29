'use strict';

var Datastore = require('nedb');

var options = {
	filename: __dirname + '/db.json',
	autoload: true
};

var db = new Datastore(options);

var params = {
	_id: 1
};

function content(err, doc) {
	doc = doc || {_id: 1, counter: 0};

	console.log('Este ejemplo fue ejecutado', doc.counter, 'veces');
	console.log('El último acceso fué', doc.lastSeetAt);

	doc.lastSeetAt = new Date();
	doc.counter++;

	db.update(params, doc, {upsert: true}, function(err, num){
		console.log('Actualizado', num, 'registros');
	});
}

db.findOne(params, content);



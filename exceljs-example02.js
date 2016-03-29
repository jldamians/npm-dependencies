'strict';

var Promise = require('bluebird');
var Excel = require('exceljs');
var fs = require('fs');

var data = [];
var conf = {
	FROM: 'tercero.xlsx',
	TO: 'resultado.xlsx'
}

// creamos documento
var workbook = new Excel.Workbook();

// creamos hoja
var worksheet = workbook.addWorksheet('My Sheet', 'FFC0000');

// definimos las columnas
worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 35 },
    { header: 'Email', key: 'email', width: 20 },
    { header: 'Ubigeo', key: 'ubigeo', width: 20 }
];

// escribimos el documento, en un stream
workbook.xlsx.write(fs.createWriteStream(conf.TO))
	.then(function(){
		console.log('creado');
	})
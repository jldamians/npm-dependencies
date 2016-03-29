'strict';

var Promise = require('bluebird');
var Excel = require('exceljs');
var fs = require('fs');

var conf = {
	PATH: 'resultado.xlsx',
	COLS: [    
		{ header: 'Id', key: 'id', width: 10 },
	    { header: 'Name', key: 'name', width: 35 },
	    { header: 'Email', key: 'email', width: 20 },
	    { header: 'Ubigeo', key: 'ubigeo', width: 20 }
    ],
	ROWS: [
	    [1, 'Jose Damian', '<jdamian@tam-c.com>', 'Pucallpa'],
	    [2, 'Gustabo Artica', '<gartica@tam-c.com>', 'Huancayo'],
	    [3, 'Diana Hun', '<diana.hun@tam-c.com>', 'Lima'],
	    [4, 'Juan Azabache', '<jazabache@tam-c.com>', 'Lima'],
	    [5, 'Ely Ramos Yañe', '<eramos@tam-c.com>', 'Lima'],
	]
}

// creamos documento
var workbook = new Excel.Workbook();

// creamos hoja
var worksheet = workbook.addWorksheet('My Sheet', 'FFC0000');

// definimos las columnas
worksheet.columns = conf.COLS;

// definimos las filas
worksheet.addRows(conf.ROWS);

// escribimos el documento, en un stream
workbook.xlsx.write(fs.createWriteStream(conf.PATH))
	.then(function(){
		console.log('creado');
	})
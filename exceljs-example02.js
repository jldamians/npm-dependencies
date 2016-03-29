'strict';

var Promise = require('bluebird');
var Excel = require('exceljs');
var fs = require('fs');

var style = {
	ROW_HEADER: { 
		font: { name: 'Times New Roman', size: 12, bold: true, color: { argb: 'DD254E'} },
		fill: { type: 'pattern', pattern:'solid', fgColor:{argb:'FFFFFF00'}, bgColor:{argb:'FF0000FF'} }
	},
	ROW_BODY: { font: { name: 'Arial', size: 11, italic: true, color: { argb: '4455A2'} } }
}

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
	    [6, 'Jose Florindez', '<jflorindez@tam-c.com>', 'Lima'],
	    [7, 'Hector Billi Huby Bautista', '<hhuby@tam-c.com>', 'Lima'],
	    [8, 'Luigi Limaylla', '<luigi.limaylla@tam-c.com>', 'Lima'],
	    [9, 'Daniel Infante Capristano', '<dinfante@tam-c.com>', 'Lima'],
	    [10, 'Alejandro Nunez', '<anunez@tam-c.com>', 'Lima'],
	]
}

// creamos documento
var workbook = new Excel.Workbook();

// creamos hoja
var worksheet = workbook.addWorksheet('My Sheet', 'FFC0000');

// insertamos las cabeceras
worksheet.columns = conf.COLS;

// insertamos los registros
worksheet.addRows(conf.ROWS);

// seteando estilos a las cabeceras y registros
worksheet.eachRow(function(row, rowNumber) {
	if ( rowNumber === 1 ) {
		row.font = style.ROW_HEADER.font;
		row.fill = style.ROW_HEADER.fill;
	} else {
		row.font = style.ROW_BODY.font
	}
});

// escribimos el documento, en un stream
workbook.xlsx.write(fs.createWriteStream(conf.PATH))
	.then(function(){
		console.log('creado');
	})
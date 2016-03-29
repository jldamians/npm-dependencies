'strict';

var Excel = require('exceljs');

var workbook = new Excel.Workbook();

var data = [];

workbook.xlsx.readFile('tercero.xlsx')
    .then(function(res) {
        var sheet01 = res.getWorksheet(1);
        var rowArray;

        if ( !sheet01 ) {
        	return;
        }

		return sheet01.eachRow(function(row, item) {
			if ( item === 1) {
				return;
			}

			rowArray = row.values;

			if ( !rowArray[0] ) {
				rowArray = rowArray.slice(1);
			}

			data.push(rowArray);
		});
    }).then(function(){
    	console.log('data => ', data);
    });
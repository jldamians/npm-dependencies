var later = require('later');

var countTimes = 10 ; // numero de ocurrencias

var sched       = later.parse.text('every 6 mins'); // indicamos el intervalo de tiempo para cada ocurrencia
var occurrences = later.schedule(sched).next(countTimes); // indicamos en 'next' cuantos ocurrencias o fechas seran generadas

// recorremos las ocurrencias generadas
for(var i = 0; i < countTimes; i++) {
	console.log('['+(i+1)+']', occurrences[i]);
}
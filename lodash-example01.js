var _ = require('lodash') ;

var obj0 = {
	'direccion': 'San Isidro',
	'nombre': 'Mineria Corporativa',
	'numeroDocumentoIdentidad': '21518915119',
	'telefono': '94564612',
	'tipoDocumentoIdentidad': '6'
}
var obj1 = {
	'emailConfirmado': true,
	'emailContacto': "dinfante@tam-c.com",
	'empresaCreacion': 1,
	'estado': "1",
	'idCliente': 1
}

console.log(_.merge(obj0, obj1));
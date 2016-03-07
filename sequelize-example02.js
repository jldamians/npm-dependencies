'use strict'

/*
 * BelongsTo: Se utiliza cuando el "foreign key" de la relacion "uno a uno"
 * existe en el modelo de origen
 */

var db     = require('./sequelize-example01')
var Marca  = db.Marca
var Modelo = db.Modelo

// Indicamos que atributo de la tabla "Marca", es "foreignKey" 
// en el tabla "Modelo"
Modelo.belongsTo(Marca, {foreignKey: 'idmarca'})


Modelo.findAll({    
    include: [
        Marca
    ]
}).then(function(result) {
    result.forEach(function(elem){
        console.log('Modelo => ', elem['dataValues'])
        console.log('')
        console.log('')
    })
})
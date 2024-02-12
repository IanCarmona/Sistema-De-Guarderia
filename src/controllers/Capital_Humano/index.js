const edit = require("./edit")
const nuevo_empleado = require("./nuevo_empleado.js")
const pantalla_editar_empleado = require("./pantalla_editar_empleado.js")
const pantalla_nuevo_empleado = require("./pantalla_nuevo_empleado.js")
const eliminar = require("./eliminar.js")
const update = require("./update.js")

module.exports = {    
    nuevo_empleado,
    pantalla_editar_empleado,
    pantalla_nuevo_empleado,
    update,
    edit,
    eliminar
}

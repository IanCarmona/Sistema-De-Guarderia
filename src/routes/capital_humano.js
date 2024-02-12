const express = require('express');
const CapitalHumano = require("../controllers/Capital_Humano");

const router = express.Router();

router.get('/nuevo_empleado', CapitalHumano.pantalla_nuevo_empleado);
router.get('/editar_empleado', CapitalHumano.pantalla_editar_empleado);
router.post('/nuevo_empleado', CapitalHumano.nuevo_empleado);

router.get('/editar/:correo', CapitalHumano.update);
router.post('/editar/:correo', CapitalHumano.edit);
router.get('/eliminar/:correo', CapitalHumano.eliminar);


module.exports = router;

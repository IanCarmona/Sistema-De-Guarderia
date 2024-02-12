const express = require('express');
const PedagogoController = require("../controllers/Pedagogo");

const router = express.Router();

router.get('/nuevoGrupo', PedagogoController.nuevoGrupo);
router.post('/nuevoGrupo', PedagogoController.crearNuevoGrupo);



router.get('/ingresarPersonasGrupo', PedagogoController.ingresarPersonasGrupo);
router.post('/ingresarPersonasGrupo', PedagogoController.obtenerDatosSala);
router.post('/asignarSala', PedagogoController.asignarSala);



module.exports = router;

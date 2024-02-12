const express = require('express');
const Cuidador = require("../controllers/Cuidador");

const router = express.Router();

router.get('/asistenciaCuidador/:tipo', Cuidador.traerInfoAsistencia);
router.post('/asistenciaCuidador/:tipo', Cuidador.enviarInfoAsistencia);
router.get('/comidasCuidador/:tipo', Cuidador.traerInfoComida);
router.post('/comidasCuidador/:tipo', Cuidador.enviarInfoComida);
router.get('/evacuacionesCuidador', Cuidador.traerInfoEvacuaciones);
router.get('/aumentarContador/:tipo/:idAlumno', Cuidador.enviarInfoEvacuaciones);
router.get('/eventosCuidador', Cuidador.traerEventoCuidador);
router.post('/eventosCuidador', Cuidador.enviarInfoEventos);

module.exports = router;

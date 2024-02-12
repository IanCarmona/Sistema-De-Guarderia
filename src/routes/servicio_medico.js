const express = require('express');
const ServicioMedicoController = require("../controllers/Servicio_Medico");

const router = express.Router();

router.get('/nuevoReporteMedico', ServicioMedicoController.traerSalas);
router.post('/nuevoReporteMedico', ServicioMedicoController.traerAlumnos);
router.get('/crearReporteAlumno/:idAlumno', ServicioMedicoController.traerDatosAlumnos);
router.post('/crearReporteAlumno/:idAlumno', ServicioMedicoController.enviarDatosAlumnos);



module.exports = router;

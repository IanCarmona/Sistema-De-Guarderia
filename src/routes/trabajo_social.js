const express = require('express');
const TrabajoSocialController = require("../controllers/Trabajo_Social");

const router = express.Router();

router.get('/nuevoAlumno', TrabajoSocialController.nuevoAlumno);
router.post('/nuevoAlumno', TrabajoSocialController.registrarNuevoAlumno);
router.get('/editarAlumno', TrabajoSocialController.editarAlumno);
router.get('/editarAlumno/:idAlumno', TrabajoSocialController.update);
router.post('/editarAlumno/:idAlumno', TrabajoSocialController.edit);
router.get('/eliminarAlumno/:idAlumno', TrabajoSocialController.eliminar);

module.exports = router;

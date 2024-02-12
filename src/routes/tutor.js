const express = require('express');
const TutorController = require("../controllers/Tutor");

const router = express.Router();


router.get('/verDiaTutor', TutorController.verDia);
router.get('/verMenuTutor', TutorController.verMenu);
router.get('/verIncidenciasTutor', TutorController.verIncidencias);
router.get('/agregarFotoTutor', TutorController.verFoto);





module.exports = router;

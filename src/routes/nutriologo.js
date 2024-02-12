const express = require('express');
const NutriologoController = require("../controllers/Nutriologo");

const router = express.Router();

router.get('/crearDesayuno', NutriologoController.traerNuevoDesayuno);
router.post('/crearDesayuno', NutriologoController.enviarNuevoDesayuno);
router.get('/crearComida', NutriologoController.traerNuevaComida);
router.post('/crearComida', NutriologoController.enviarNuevaComida);
router.get('/crearCena', NutriologoController.traerNuevaCena);
router.post('/crearCena', NutriologoController.enviarNuevaCena);
router.get('/editarComidas', NutriologoController.traerComidas);
router.get('/editarComidas/:nombreT/:nombreC', NutriologoController.traerComidasEditar);
router.get('/eliminarComidas/:nombreT/:nombreC', NutriologoController.eliminarComidas);
router.post('/editarComidas/:nombreT/:nombreC', NutriologoController.enviarComidasEditadas);
router.get('/crearMenu', NutriologoController.traerNuevoMenu);
router.post('/crearMenu', NutriologoController.enviarNuevoMenu);



module.exports = router;

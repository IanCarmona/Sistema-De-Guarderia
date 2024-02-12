const express = require('express');
const SecretariaController = require("../controllers/Secretaria");

const router = express.Router();

router.get('/eventosSecretaria', SecretariaController.traerEventos);
router.post('/eventosSecretaria', SecretariaController.enviarEventos);



module.exports = router;

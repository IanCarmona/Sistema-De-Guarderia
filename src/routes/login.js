const express = require('express');
const LoginController = require("../controllers/Login");

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
router.get('/logout', LoginController.logout);
router.get('/registrar', LoginController.registrar);
router.post('/registrar', LoginController.registrarTutor);

module.exports = router;

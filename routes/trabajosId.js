const express = require('express');
const router = express.Router();
const trabajoController = require('../controllers/trabajoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea proyectos
// api/proyectos


router.post('/', 
    auth,
    trabajoController.obtenerTrabajosId
);

module.exports = router;

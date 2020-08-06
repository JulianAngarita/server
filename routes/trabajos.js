const express = require('express');
const router = express.Router();
const trabajoController = require('../controllers/trabajoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea proyectos
// api/proyectos
router.post('/', 
    auth,
    [
        check('titulo', 'El titulo del proyecto es obligatoio').not().isEmpty()
    ],
    trabajoController.crearTrabajo
);

router.post('/', 
    auth,
    trabajoController.obtenerTrabajosId
);

// Obtener todos los proyectos
router.get('/', 
    auth,
    trabajoController.obtenerTrabajos
)

module.exports = router;

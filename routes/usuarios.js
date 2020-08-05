const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea un usuario
// api/usuarios
router.post('/', 
    [
        check('nombres', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6})
    ],
    usuarioController.crearUsuario
);

router.get('/',
    auth,
    usuarioController.obtenerUsuarios
)


module.exports = router;
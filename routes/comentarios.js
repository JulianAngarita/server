const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea comentarios
// api/comentarios
router.post('/', 
    auth,
    [
        check('asunto', 'El asunto del comentario es obligatoio').not().isEmpty(),
        check('nombres', 'El nombre del estudiante es obligatoio').not().isEmpty(),
        check('curso', 'El asunto del estuadiante es obligatoio').not().isEmpty(),
        check('contenido', 'El contenido del comentario es obligatoio').not().isEmpty()
    ],
    comentarioController.crearComentario
);

// Obtener todos los comentarios
router.get('/', 
    auth,
    comentarioController.obtenerComentarios
)

module.exports = router;
const Comentario = require('../models/Comentario');
const { validationResult } = require('express-validator');

exports.crearComentario = async(req, res) => {

    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        // Crear un nuevo proyecto
        comentario = new Comentario(req.body);

        // Guardar el creador via JWT
        comentario.creador = req.usuario.id;

        // guardamos el proyecto
        comentario.save();
        res.json({
            estatus: true,
            resultadoOperacion: "Comentario creado con exito",
            comentario:comentario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find({}).sort({ creado: -1 });
        console.log(comentarios)
        res.json({
            estatus: true,
            resultadoOperacion: "Obtenidos con exito",
            data: {
                comentarios: comentarios
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
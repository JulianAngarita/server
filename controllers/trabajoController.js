const Trabajo = require('../models/Trabajos');
const { validationResult } = require('express-validator');

exports.crearTrabajo = async(req, res) => {

    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        // Crear un nuevo proyecto
        trabajo = new Trabajo(req.body);

        // Guardar el creador via JWT
        trabajo.creador = req.usuario.id;

        // guardamos el proyecto
        trabajo.save();
        res.json({
            estatus: true,
            resultadoOperacion: "Proyecto creado con exito",
            trabajo:trabajo
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerTrabajos = async (req, res) => {
    try {
        const proyectos = await Trabajo.find({ creador: req.usuario.id }).sort({ creado: -1 });
        console.log(proyectos)
        res.json({
            estatus: true,
            resultadoOperacion: "Obtenidos con exito",
            data: {
                proyectos: proyectos
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTrabajosId = async (req, res) => {
    try {
        const { id } = req.body 
        const proyectos = await Trabajo.find({ creador: id }).sort({ creado: -1 });
        res.json({
            estatus: true,
            resultadoOperacion: "Obtenidos con exito",
            data: {
                proyectos: proyectos
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
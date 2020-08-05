const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer email y password
    const { email, password } = req.body;


    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt );

        // guardar usuario
        await usuario.save();

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({
                data:{
                    estatus: true,
                    resultadoOperacion: "Cuenta creada con exito",
                }
            });
        });


    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}).sort({ creado: -1 });
        console.log(usuarios)
        res.json({
            estatus: true,
            resultadoOperacion: "Obtenidos con exito",
            data: {
                usuarios: usuarios
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


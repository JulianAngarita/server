const mongoose = require('mongoose');
const moment = require('moment-timezone')

const UsuariosSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true, 
        unique: true
    },
    curso: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registro: {
        type: Date,
        default: moment().format()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);

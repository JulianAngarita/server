const mongoose = require('mongoose')
const moment = require('moment-timezone')

const ComentarioSchema = mongoose.Schema({
    asunto:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    curso: {
        type: String,
        required: true,
        trim: true
    },
    contenido:{
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: moment().format()
    }
})

module.exports = mongoose.model('Comentario', ComentarioSchema);
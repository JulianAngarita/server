const mongoose = require('mongoose')
const moment = require('moment-timezone')

const TrabajoSchema = mongoose.Schema({
    titulo:{
        type: String,
        required: true,
        trim: true
    },
    contenido:{
        type: String,
        required: true,
        trim: true
    },
    nota:{
        type: String,
        required: false,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    media: {
        linkFoto: {type: String, default: ''},
        linkVideo: {type: String, default: ''}
    },
    creado: {
        type: Date,
        default: moment().format()
    }

})

module.exports = mongoose.model('Trabajo', TrabajoSchema);

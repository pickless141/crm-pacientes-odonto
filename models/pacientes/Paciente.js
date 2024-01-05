const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pacienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: Number,
    password: {
        type: String,
        unique: true,
        trim: true
    }
})

module.exports = mongoose.model('Paciente', pacienteSchema)
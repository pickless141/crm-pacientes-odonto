const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historialClinicoSchema = new Schema({
  paciente: {
    type: Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true,
  },
  edad: Number,
  fechaNacimiento: Date,
  peso: Number,
  identidad: Number,
  tratamiento: {
    type: String,
    required: true,
    trim: true
  },
  observaciones: {
    type: String,
    trim: true
  },
});

module.exports = mongoose.model('HistorialClinico', historialClinicoSchema);
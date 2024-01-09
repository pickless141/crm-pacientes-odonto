const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citaSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aceptada', 'rechazada'],
    default: 'pendiente',
  },
  paciente: {
    type: Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true,
  }
});

module.exports = mongoose.model('Cita', citaSchema);
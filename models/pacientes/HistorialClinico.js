const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historialClinicoSchema = new Schema({
  paciente: {
    type: Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true,
  },
  observaciones: {
    type: String,
  },
});

module.exports = mongoose.model('HistorialClinico', historialClinicoSchema);
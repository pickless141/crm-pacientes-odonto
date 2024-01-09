const HistorialClinico = require('../../models/pacientes/HistorialClinico');

const registrarDatosOdontologo = async (req, res) => {
  const { pacienteId, observaciones } = req.body;

  try {

    // Crear un nuevo historial clínico
    const nuevoHistorial = new HistorialClinico({
      paciente: pacienteId,
      observaciones,
    });

    await nuevoHistorial.save();

    res.status(201).json({ mensaje: 'Datos registrados exitosamente' });
  } catch (error) {
    console.error('Error al registrar los datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarDatosOdontologo,
};
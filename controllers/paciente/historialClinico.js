const HistorialClinico = require('../../models/pacientes/HistorialClinico');

const registrarDatosOdontologo = async (req, res) => {
  const { pacienteId, edad, fechaNacimiento, peso, identidad, tratamiento, observaciones } = req.body;

  try {
    // Convertir la fecha de nacimiento a un objeto de fecha
    const fechaNacimientoObj = new Date(fechaNacimiento);

    // Crear un nuevo historial clínico
    const nuevoHistorial = new HistorialClinico({
      paciente: pacienteId,
      edad,
      fechaNacimiento: fechaNacimientoObj,
      peso,
      identidad,
      tratamiento,
      observaciones,
    });

    await nuevoHistorial.save();

    res.status(201).json({ mensaje: 'Datos registrados exitosamente' });
  } catch (error) {
    console.error('Error al registrar los datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const mostrarHistorial = async (req, res) => {
  try {
    // Obtener todos los registros clínicos
    const historiales = await HistorialClinico.find().populate('paciente'); // Puedes ajustar 'paciente' según tus necesidades

    res.status(200).json({ historiales });
  } catch (error) {
    console.error('Error al obtener el historial clínico:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarDatosOdontologo,
  mostrarHistorial,
};
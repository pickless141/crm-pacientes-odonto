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

const editarHistorial = async (req, res) => {
  const historialId = req.params.historialId; 

  try {
    // Verifica si el historial clínico existe
    const historialExistente = await HistorialClinico.findById(historialId);
    if (!historialExistente) {
      return res.status(404).json({ error: 'Historial clínico no encontrado' });
    }

    // Extrae los datos actualizados del cuerpo de la solicitud
    const { edad, fechaNacimiento, peso, identidad, tratamiento, observaciones } = req.body;

    // Actualiza el historial clínico con los nuevos datos
    historialExistente.edad = edad;
    historialExistente.fechaNacimiento = new Date(fechaNacimiento);
    historialExistente.peso = peso;
    historialExistente.identidad = identidad;
    historialExistente.tratamiento = tratamiento;
    historialExistente.observaciones = observaciones;

    // Guarda los cambios
    await historialExistente.save();

    res.status(200).json({ mensaje: 'Historial clínico actualizado exitosamente' });
  } catch (error) {
    console.error('Error al editar el historial clínico:', error.message);
    res.status(500).json({ error: 'Ese historial no existe, intenta de nuevo!' });
  }
};

module.exports = {
  registrarDatosOdontologo,
  mostrarHistorial,
  editarHistorial
};
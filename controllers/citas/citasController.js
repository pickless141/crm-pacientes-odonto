const Cita = require('../../models/citas/Citas');
const verificarAutenticacion = require('../../middlewares/authMiddleware');
const Paciente = require('../../models/pacientes/Paciente');
const transporter = require('../../config/mailerConfig');

const registrarCita = async (req, res) => {
  try {
    verificarAutenticacion(req, res, async () => {
      const { fecha, hora, pacienteId } = req.body;

      // Verificar si el paciente existe
      const paciente = await Paciente.findById(pacienteId);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }

      // Crear nueva cita
      const nuevaCita = new Cita({
        fecha,
        hora,
        paciente: pacienteId,
      });

      await nuevaCita.save();

      // Enviar correo de confirmación al paciente
      const mensajeCorreo = {
        from: process.env.GMAIL_USER,
        to: paciente.email,
        subject: 'Confirmación de Cita',
        text: `Su cita para el ${fecha} a las ${hora} ha sido registrada exitosamente.`,
      };

      await transporter.sendMail(mensajeCorreo);

      // Obtener la cita registrada con la información del paciente
      const citaRegistrada = await Cita.findById(nuevaCita._id).populate('paciente');

      res.status(201).json({ mensaje: 'Cita registrada exitosamente', cita: citaRegistrada });
    });
  } catch (error) {
    console.error('Error al registrar la cita:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarCita,
};
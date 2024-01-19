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
        html: `
          <html>
            <head>
              <style>
                body {
                  background-color: #f4f4f4;
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  background-color: #8ed2c9;
                  max-width: 400px;
                  margin: 20px auto;
                  padding: 20px;
                  text-align: center;
                }
                .mensaje {
                  font-size: 16px;
                  color: #333;
                }
                .despedida {
                  font-size: 14px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <p class="mensaje">Su cita para el ${fecha} a las ${hora} ha sido registrada exitosamente.</p>
                <p class="despedida">¡Esperamos verlo pronto!</p>
              </div>
            </body>
          </html>
        `,
      };

      await transporter.sendMail(mensajeCorreo);

      // Obtener la cita registrada con la información del paciente
      const citaRegistrada = await Cita.findById(nuevaCita._id).populate('paciente');

      res.status(201).json({ mensaje: 'Cita registrada exitosamente', cita: citaRegistrada });
    });
  } catch (error) {
    console.error('Error al registrar la cita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const actualizarEstadoCita = async (req, res) => {
  try {
    verificarAutenticacion(req, res, async () => {
      const { citaId, estado } = req.body;

      // Verificar si la cita existe
      const citaExistente = await Cita.findById(citaId);
      if (!citaExistente) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }

      // Validar que el estado proporcionado sea válido
      if (estado !== 'rechazada' && estado !== 'aceptada') {
        return res.status(400).json({ error: 'Estado de cita no válido' });
      }

      // Actualizar el estado de la cita
      citaExistente.estado = estado;
      await citaExistente.save();

      res.status(200).json({ mensaje: `Estado de la cita actualizado a ${estado}` });
    });
  } catch (error) {
    console.error('Error al actualizar el estado de la cita:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerCitas = async (req, res) => {
  try {
    verificarAutenticacion(req, res, async () => {
      // Obtener todas las citas registradas
      const citas = await Cita.find().populate('paciente');

      res.status(200).json({ citas });
    });
  } catch (error) {
    console.error('Error al obtener las citas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarCita,
  obtenerCitas,
  actualizarEstadoCita
};


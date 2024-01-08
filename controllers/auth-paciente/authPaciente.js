const Paciente = require('../../models/pacientes/Paciente.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generarToken = (pacienteID) => {
    const jwtSecret = process.env.jwtSecret
  return jwt.sign({ pacienteID }, jwtSecret, { expiresIn: '1h' });
};

const autenticarPaciente = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el paciente existe
    const paciente = await Paciente.findOne({ email });

    if (!paciente) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const esContraseñaValida = await bcrypt.compare(password, paciente.password);

    if (!esContraseñaValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar y enviar el token JWT
    const token = generarToken(paciente._id);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al autenticar al paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  autenticarPaciente,
};
const Usuario = require('../../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.jwtSecret;

const autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const esContraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!esContraseñaValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar el token
    const token = jwt.sign({ usuarioId: usuario._id }, jwtSecret, { expiresIn: '1h' });

    // Devolver el token en la respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  autenticarUsuario,
};
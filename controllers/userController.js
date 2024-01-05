const Usuario = require('../models/User');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario con el rol especificado
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  crearUsuario,
};
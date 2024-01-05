const Paciente = require('../../models/pacientes/Paciente.js');
const bcrypt = require('bcrypt');

const crearPaciente = async (req, res) => {
  const { nombre, apellido, email, telefono, password } = req.body;

  try {
    // Verificar si el paciente ya existe
    const pacienteExistente = await Paciente.findOne({ email });
    if (pacienteExistente) {
      return res.status(400).json({ error: 'El paciente ya existe' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoPaciente = new Paciente({
      nombre,
      apellido,
      email,
      telefono,
      password: hashedPassword,
    });

    await nuevoPaciente.save();

    res.status(201).json({ mensaje: 'Paciente creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  crearPaciente,
};
const { Router } = require('express');
const authPaciente = require('../controllers/auth-paciente/authPaciente');

const authPacienteRoutes = Router();

// Ruta para iniciar sesión
authPacienteRoutes.post('/', authPaciente.autenticarPaciente);

module.exports = authPacienteRoutes;
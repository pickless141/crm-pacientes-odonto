const { Router } = require('express');
const authPaciente = require('../controllers/authpaciente/AuthPaciente.js');

const authPacienteRoutes = Router();

// Ruta para iniciar sesión
authPacienteRoutes.post('/', authPaciente.autenticarPaciente);

module.exports = authPacienteRoutes;
const { Router } = require('express');
const authUser = require('../controllers/auth-usuario/authUser.js');

const authUserRoutes = Router();

// Ruta para iniciar sesión
authUserRoutes.post('/', authUser.autenticarUsuario);

module.exports = authUserRoutes;
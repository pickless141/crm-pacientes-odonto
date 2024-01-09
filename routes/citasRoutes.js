const { Router } = require('express');
const citasController = require('../controllers/citas/citasController');
const verificarAutenticacion = require('../middlewares/authMiddleware');

const citasRoutes = Router();

// Ruta para que el odontólogo autenticado pueda registrar una cita
citasRoutes.post('/', verificarAutenticacion, citasController.registrarCita);

module.exports = citasRoutes;
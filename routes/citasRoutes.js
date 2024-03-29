const { Router } = require('express');
const citasController = require('../controllers/citas/citasController');
const verificarAutenticacion = require('../middlewares/authMiddleware');

const citasRoutes = Router();

//Ruta para traer todas las citas registradas 
citasRoutes.get('/', verificarAutenticacion, citasController.obtenerCitas);
// Ruta para que el odontólogo autenticado pueda registrar una cita
citasRoutes.post('/', verificarAutenticacion, citasController.registrarCita);

//Ruta que actualiza el estado de la cita 
citasRoutes.put('/', verificarAutenticacion, citasController.actualizarEstadoCita);

module.exports = citasRoutes;
const { Router } = require('express');
const datosOdontologo = require('../controllers/paciente/historialClinico');
const verificarAutenticacion = require('../middlewares/authMiddleware');

const datosOdontologoRoutes = Router();

// Ruta para crear historial clinico
datosOdontologoRoutes.post('/', verificarAutenticacion, datosOdontologo.registrarDatosOdontologo);

// Ruta para mostrar todo el historial clínico
datosOdontologoRoutes.get('/', verificarAutenticacion, datosOdontologo.mostrarHistorial);

module.exports = datosOdontologoRoutes;
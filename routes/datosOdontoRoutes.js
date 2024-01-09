const { Router } = require('express');
const datosOdontologo = require('../controllers/paciente/historialClinico');
const verificarAutenticacion = require('../middlewares/authMiddleware')

const datosOdontologoRoutes = Router();

datosOdontologoRoutes.post('/', verificarAutenticacion, datosOdontologo.registrarDatosOdontologo);

module.exports = datosOdontologoRoutes;
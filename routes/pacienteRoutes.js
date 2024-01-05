const {Router} = require('express');
const pacienteRoutes = Router();
const pacienteController = require('../controllers/paciente/pacienteController.js');

pacienteRoutes.post('/', pacienteController.crearPaciente);


module.exports = pacienteRoutes;
const { Router } = require('express');
const datosOdontologo = require('../controllers/paciente/historialClinico');
const verificarAutenticacion = require('../middlewares/authMiddleware');

const odontologo = Router();

// Ruta para crear historial clinico
odontologo.post('/', verificarAutenticacion, datosOdontologo.registrarDatosOdontologo);

// Ruta para mostrar todo el historial clínico
odontologo.get('/', verificarAutenticacion, datosOdontologo.mostrarHistorial);

//Ruta para editar datos por ID
odontologo.put('/:historialId', verificarAutenticacion, datosOdontologo.editarHistorial);

//Ruta para eliminar historial
odontologo.delete('/:historialId', verificarAutenticacion, datosOdontologo.eliminarHistorial);

module.exports = odontologo;
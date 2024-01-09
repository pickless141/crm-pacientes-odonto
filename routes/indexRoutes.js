const { Router } = require('express');
const mainRoutes = Router();

const userRoutes = require('./userRoutes');
const pacienteRoutes = require('./pacienteRoutes');
const authPacienteRoutes = require('./authPacienteRoutes');
const authUserRoutes = require('./authUserRoutes');
const citasRoutes = require('./citasRoutes'); 
const datosOdontoRoutes = require('./datosOdontoRoutes');

mainRoutes.use('/usuarios', userRoutes);
mainRoutes.use('/paciente', pacienteRoutes);
mainRoutes.use('/authpaciente', authPacienteRoutes);
mainRoutes.use('/admin', authUserRoutes);
mainRoutes.use('/citas', citasRoutes);
mainRoutes.use('/odontologo/datos', datosOdontoRoutes);  

module.exports = mainRoutes;
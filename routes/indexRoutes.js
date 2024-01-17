const { Router } = require('express');
const mainRoutes = Router();

const userRoutes = require('./userRoutes');
const pacienteRoutes = require('./pacienteRoutes');
const authPacienteRoutes = require('./authPacienteRoutes');
const authUserRoutes = require('./authUserRoutes');
const citasRoutes = require('./citasRoutes'); 
const odontoRoutes = require('./odontologoRoutes');

mainRoutes.use('/usuarios', userRoutes);
mainRoutes.use('/paciente', pacienteRoutes);
mainRoutes.use('/authpaciente', authPacienteRoutes);
mainRoutes.use('/admin', authUserRoutes);
mainRoutes.use('/citas', citasRoutes);
mainRoutes.use('/odontologo/datos', odontoRoutes);  

module.exports = mainRoutes;
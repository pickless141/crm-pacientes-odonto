const {Router} = require('express')
const mainRoutes = Router();

const userRoutes = require('./userRoutes');
const pacienteRoutes = require('./pacienteRoutes');
const authPacienteRoutes = require('./authPacienteRoutes');
const authUserRoutes = require('./authUserRoutes');


mainRoutes.use('/usuarios', userRoutes)
mainRoutes.use('/paciente', pacienteRoutes)
mainRoutes.use('/authpaciente', authPacienteRoutes)
mainRoutes.use('/admin', authUserRoutes)

module.exports = mainRoutes
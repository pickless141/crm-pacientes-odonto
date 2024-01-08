const {Router} = require('express')
const mainRoutes = Router();

const userRoutes = require('./userRoutes');
const pacienteRoutes = require('./pacienteRoutes');
const authPacienteRoutes = require('./authPacienteRoutes');


mainRoutes.use('/usuarios', userRoutes)
mainRoutes.use('/paciente', pacienteRoutes)
mainRoutes.use('/authpaciente', authPacienteRoutes)

module.exports = mainRoutes
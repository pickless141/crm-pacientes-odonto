const {Router} = require('express')
const mainRoutes = Router();

const userRoutes = require('./userRoutes');
const pacienteRoutes = require('./pacienteRoutes');


mainRoutes.use('/usuarios', userRoutes)
mainRoutes.use('/paciente', pacienteRoutes)

module.exports = mainRoutes
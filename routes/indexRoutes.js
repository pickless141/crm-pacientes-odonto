const {Router} = require('express')
const mainRoutes = Router();

const userRoutes = require('./userRoutes')


mainRoutes.use('/usuarios', userRoutes)

module.exports = mainRoutes
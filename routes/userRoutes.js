const {Router} = require('express');
const userRoutes = Router();
const userController = require('../controllers/usuario/userController');

userRoutes.post('/', userController.crearUsuario);


module.exports = userRoutes;
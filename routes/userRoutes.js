const {Router} = require('express');
const userRoutes = Router();
const userController = require('../controllers/userController.js');

userRoutes.post('/', userController.crearUsuario);


module.exports = userRoutes;
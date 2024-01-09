const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret 

const verificarAutenticacion = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Token no proporcionado' });
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded.user;

    // Continúa con el siguiente middleware o ruta
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ mensaje: 'Token no válido' });
  }
};

module.exports = verificarAutenticacion;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.nombreUsuario = payload.nombreUsuario;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ error: 'Token ha expirado' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: 'Token o firma no válida' });
    } else {
      return res.status(401).send({ error: 'Token no válido' });
    }
  }
};

module.exports = { authMiddleware };

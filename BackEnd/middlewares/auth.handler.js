const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserService = require("../services/user.service");

const authMiddleware = async (req, res, next) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Extracted Token:", token);
  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .json({ status: false, message: 'No token provided', data: null });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await UserService.findOne(decoded.user_id);
    console.log("User Data:", user);

    if (!user) {
      console.log("Invalid token: Usuario no encontrado");
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user;

    /* if (!user.admin) {
      console.log("Usuario no es admin");
      return res
        .status(403)
        .json({ message: "Forbidden: No eres admin" });
    }
    console.log("Usuario está autorizado como admin"); */

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        status: false,
        message: 'Token expired',
        data: null,
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: false,
        message: 'Invalid token or signature',
        data: null,
      });
    } else {
      return res.status(401).json({ 
        status: false, message: 'Invalid token', data: null });
    }
  }
};

module.exports = { authMiddleware };

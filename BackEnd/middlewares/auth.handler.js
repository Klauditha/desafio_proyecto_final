const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserService = require("../services/user.service");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: 'No token provided', data: null });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserService.findOne(decoded.user_id);
    
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user;
    req.user.isAdmin = user.admin === true;


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

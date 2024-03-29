const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
const boom = require("@hapi/boom");
const UserService = require("../services/user.service");
const { generateToken } = require("../services/user.service");
const { authMiddleware } = require("../middlewares/auth.handler");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.authenticateUser(email, password);
    const user_id = user.user_id;
    const token = await UserService.generateToken(user_id, "10m");

    res.status(200).json({
      status: true,
      message: "El usuario está logeado.",
      data: { token: token },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  loginUser

};

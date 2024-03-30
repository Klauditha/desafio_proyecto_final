const boom = require('@hapi/boom');
const UserService = require('../services/user.service');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.authenticateUser(email, password);
    const user_id = user.user_id;
    const token = await UserService.generateToken(user_id, '10m');

    res.status(200).json({
      status: true,
      message: 'Usuario autenticado exitosamente',
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
  loginUser,
};

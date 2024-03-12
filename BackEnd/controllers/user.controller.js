const UsuarioService = require('../services/user.services');
const { createUserSchema } = require('../schemas/user.schema');
const boom = require('@hapi/boom');

const service = new UsuarioService();

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json({
      status: true,
      message: 'New user created',
      data: {
        user: newUser,
      },
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

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if(["{userId}",":userId","",null,undefined," "].includes(userId)){
      throw boom.badRequest('Parameter userId is invalid or not provided');
    }
    if (['1', '11', '21'].includes(userId)) {
      throw boom.conflict('User not found');
    }
    const user = await service.findOne(userId);
    res.status(200).json({
      status: true,
      message: 'User found',
      data: {
        user: user,
      },
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
  createUser,
  getUser,
};

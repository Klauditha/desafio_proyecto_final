const UsuarioService = require('../services/user.services');
const { createUserSchema } = require('../schemas/user.schema');

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
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const getUser = async (req, res, next) => {
  console.log('getUser');
  try {
    const { id } = req.params;
    const user = service.findOne(id);
    res.status(200).json({
      status: true,
      message: 'User found',
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const updateUser = (req, res, next) => {
  try {
    res.status(200).send('Usuario actualizado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = (req, res, next) => {
  try {
    res.status(200).send('Usuario eliminado');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};

const UserService = require('../services/user.service');
const {
  createUserSchema,
  updateUserSchema,
} = require('../schemas/user.schema');
const boom = require('@hapi/boom');

const createUser = async (req, res, next) => {
  try {
    const validatedData = await createUserSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const newUser = await UserService.create(validatedData);
    res.status(201).json({
      status: true,
      message: 'Nuevo usuario creado',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error('Error creando usuario:', error);
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
    const { user_id } = req.params;
    const requestedUserId = parseInt(req.params.user_id);
    const authenticatedUserId = req.user.user_id;

    if (['{user_id}', ':user_id', '', null, undefined, ' '].includes(user_id)) {
      throw boom.badRequest('Parametro user_id es invalido o no se provee');
    }

    let user = await UserService.findOne(user_id);

    if (requestedUserId !== authenticatedUserId) {
      return res.status(403).json({
        status: false,
        message:
          'Forbidden: No estás autorizado para acceder la información de este usuario.',
        data: null,
      });
    }
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await UserService.findByUsername(username);
    res.status(200).json({
      status: true,
      message: 'Usuario encontrado',
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
  
}
const deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!req.user || !req.user.admin) {
      //Ruta protegida. Solo para admins.
      return res.status(403).json({
        status: false,
        message: 'Forbidden. Solo admin puede borrar usuarios.',
        data: null,
      });
    }

    await UserService.deleteUser(user_id);
    res
      .status(200)
      .json({
        status: true,
        message: 'Usuario borrado correctamente',
        data: null,
      });
  } catch (error) {
    console.error('Error borrando usuario:', error);
    res
      .status(500)
      .json({ status: false, message: 'Internal server error', data: null });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const validatedData = await updateUserSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const updatedUser = await UserService.updateUser(user_id, validatedData);

    res.status(200).json({
      status: true,
      message: 'Usuario actualizado exitosamente.',
      data: {
        user: updatedUser,
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
  deleteUser,
  updateUser,
  getUserByUsername
};

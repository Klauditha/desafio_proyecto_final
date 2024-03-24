const UserService = require("../services/user.service");
const { createUserSchema } = require("../schemas/user.schema");
const boom = require("@hapi/boom");

const createUser = async (req, res, next) => {
  try {

    console.log("Request body:", req.body);
    const validatedData = await createUserSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log("Validated data:", validatedData);
    const newUser = await UserService.create(validatedData);
    console.log("Nuevo usuario creado:", newUser);
    res.status(201).json({
      status: true,
      message: "Nuevo usuario creado",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error("Error creando usuario:", error);
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
    console.log("Request params:", req.params);
    const { user_id } = req.params;
    console.log("user_id:", user_id);
    if (["{user_id}", ":user_id", "", null, undefined, " "].includes(user_id)) {
      throw boom.badRequest("Parametro user_id es invalido o no se provee");
    }
/*     if (["1", "11", "21"].includes(user_id)) {
      throw boom.conflict("Usuario no encontrado (getUser)");
    } */
    const user = await UserService.findOne(user_id);
    res.status(200).json({
      status: true,
      message: "Usuario encontrado",
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

const deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    /*
    if (!req.user || !req.user.admin) {
      return res.status(403).json({
        status: false,
        message: "Forbidden. Solo admin puede borrar usuarios.",
        data: null,
      });
    } */

    await UserService.deleteUser(user_id);
    res
      .status(200)
      .json({ status: true, message: "User deleted successfully", data: null });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ status: false, message: "Internal server error", data: null });
  }
};


  module.exports = {
    createUser,
    getUser,
    deleteUser,
  };

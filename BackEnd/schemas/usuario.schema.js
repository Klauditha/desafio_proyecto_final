const Joi = require('joi');

id = Joi.string().required();
primerNombre = Joi.string().required();
segundoNombre = Joi.string().required();
primerApellido = Joi.string().required();
segundoApellido = Joi.string().required();
correo = Joi.string().email().required();
password = Joi.string().required();

const createUsuarioSchema = Joi.object({
  primerNombre: Joi.string().required(),
  segundoNombre: Joi.string().required(),
  primerApellido: Joi.string().required(),
  segundoApellido: Joi.string().required(),
  correo: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUsuarioSchema = Joi.object({
  primerNombre: primerNombre,
  segundoNombre: segundoNombre,
  primerApellido: primerApellido,
  segundoApellido: segundoApellido,
});

const getUsuarioSchema = Joi.object({
  id: id.required(),
});
module.exports = {
  createUsuarioSchema,
  updateUsuarioSchema,
  getUsuarioSchema,
};

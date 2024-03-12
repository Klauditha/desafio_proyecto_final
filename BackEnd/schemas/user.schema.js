const Joi = require('joi');

userId = Joi.string().required();
userName = Joi.string().required();
firstName = Joi.string().required();
lastName = Joi.string().required();
phone = Joi.number().required();
region = Joi.string().required();
email = Joi.string().email().required();
address = Joi.string().required();
zipCode = Joi.number().required();
password = Joi.string().required();

const userSchema = Joi.object({
  userId: Joi.string(),
  userName: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.number(),
  region: Joi.string(),
  email: Joi.string(),
  address: Joi.string(),
  zipCode: Joi.number(),
  password: Joi.string(),
});

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.number().required(),
  region: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  zipCode: Joi.number().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.number(),
  region: Joi.string(),
  address: Joi.string(),
  zipCode: Joi.number(),
  password: Joi.string(),
});

const getUserSchema = Joi.object({
  
});
module.exports = {
  userSchema,
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};

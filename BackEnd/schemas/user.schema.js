const Joi = require('joi');

const userSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required(),
  region: Joi.string().required(),
  admin: Joi.boolean().required(),
  country: Joi.string().required(),
  city: Joi.string().required(), 
  district: Joi.string().required(),
  address: Joi.string().required(),
  zip_code: Joi.string().required(),
  created_at: Joi.date().required(),
  updated_at: Joi.date().required(),
  deleted: Joi.boolean().required(),
});


const createUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required(),
  region: Joi.string().required(),
  admin: Joi.boolean().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  address: Joi.string().required(),
  zip_code: Joi.string().required(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  deleted: Joi.boolean(),
});

const updateUserSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string(),
  email: Joi.string().email(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  phone: Joi.string(),
  region: Joi.string(),
  admin: Joi.boolean(),
  country: Joi.string(),
  city: Joi.string(),
  district: Joi.string(),
  address: Joi.string(),
  zip_code: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  deleted: Joi.boolean(),
});

const getUserSchema = Joi.object({
  user_id: Joi.number().integer().required(),
});

module.exports = {
  userSchema,
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};

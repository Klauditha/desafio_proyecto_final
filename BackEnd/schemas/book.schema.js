const Joi = require('joi');

bookId = Joi.string().required();
isbn = Joi.string().required();
img = Joi.string().required();
title = Joi.string().required();
language = Joi.string().required();
pages = Joi.number().required();
publisher = Joi.string().required();
pub_date = Joi.date().required();
price = Joi.number().required();
stock = Joi.number().required();

const bookSchema = Joi.object({
  bookId: Joi.string(),
  isbn: Joi.string(),
  img: Joi.string(),
  title: Joi.string(),
  language: Joi.string(),
  pages: Joi.number(),
  publisher: Joi.string(),
  pub_date: Joi.date(),
  price: Joi.number(),
  stock: Joi.number(),
});

const createBookSchema = Joi.object({
  isbn: Joi.string(),
  img: Joi.string(),
  title: Joi.string(),
  language: Joi.string(),
  pages: Joi.number(),
  publisher: Joi.string(),
  pub_date: Joi.date(),
  price: Joi.number(),
  stock: Joi.number(),
});

const updateBookSchema = Joi.object({});

const getBookSchema = Joi.object({});
module.exports = {
  bookSchema,
  createBookSchema,
  updateBookSchema,
  getBookSchema,
};

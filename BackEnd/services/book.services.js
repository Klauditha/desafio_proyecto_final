const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class BookService {
  constructor() {}

  async create(data) {
    const newBook = await models.Book.create(data);
    console.log(newBook);
    return newBook;
  }

  async findOne(book_id) {
    console.log(book_id);
    const book = await models.Book.findByPk(book_id);
    if (!book) {
      throw boom.notFound('Book not found');
    }
    return book;
  }
}

module.exports = BookService;

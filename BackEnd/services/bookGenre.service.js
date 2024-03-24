const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class BookGenreService {
  constructor() {}

  async create(data) {
    const newBookGenre = await models.BookGenre.create(data);
    return newBookGenre;
  }

  async findOneByBook(book_id) {
    const bookGenre = await models.BookGenre.findByPk(book_id);
    if (!bookGenre) {
      throw boom.notFound('BookGenre not found');
    }
    return bookGenre;
  }
}

module.exports = BookGenreService;

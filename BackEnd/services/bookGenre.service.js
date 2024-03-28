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

  async updateDeletedByBook(book_id) {
    const bookGenre = await models.BookGenre.update(
      { deleted: true },
      { where: { book_id } }
    );
    return bookGenre;
  }

  async updateByGenreBook(genre_id, book_id) {
    const bookGenre = await models.BookGenre.update(
      { genre_id },
      { where: { book_id } }
    );
    return bookGenre;
  }
}

module.exports = BookGenreService;

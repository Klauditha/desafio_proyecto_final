const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class BookAuthorService {
  constructor() {}

  async create(data) {
    
  }

  async findOneByBook(book_id) {
    const bookAuthor = await models.BookAuthor.findOne({
      where: {
        book_id
      }
    });

    if (!bookAuthor) {
      throw boom.notFound('BookAuthor not found');
    }
    return bookAuthor;
  }
}

module.exports = BookAuthorService;

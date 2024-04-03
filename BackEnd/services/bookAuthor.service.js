const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class BookAuthorService {
  constructor() {}

  async create(data) {
    data = {
      ...data,
      deleted: false,
    };
    const newBookAuthor = await models.BookAuthor.create(data);
    return newBookAuthor;
  }

  async findOneByBook(book_id) {
    const bookAuthor = await models.BookAuthor.findOne({
      where: {
        book_id: book_id,
      },
    });
    if (!bookAuthor) {
      throw boom.notFound('BookAuthor not found');
    }
    return bookAuthor;
  }

  async updateDeletedByBook(book_id) {
    const bookAuthor = await models.BookAuthor.update(
      {
        deleted: true,
      },
      {
        where: {
          book_id,
        },
      }
    );
    return bookAuthor;
  }

  async updateByAuthorBook(book_id, author_id) {
    const bookAuthor = await models.BookAuthor.update(
      {
        author_id,
      },
      {
        where: {
          book_id,
        },
      }
    );
    return bookAuthor;
  }
}

module.exports = BookAuthorService;

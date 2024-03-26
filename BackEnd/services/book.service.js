const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class BookService {
  constructor() {}

  async create(data) {
    data = {
      ...data,
      deleted: false,
      img: data.img ? data.img : '/books/notAvailable.jpg',
    };
    const newBook = await models.Book.create(data);
    return newBook;
  }

  async findOne(book_id) {
    const book = await models.Book.findOne({ where: { book_id } });
    if (!book) {
      throw boom.notFound('Book not found');
    }
    return book;
  }

  async findOneByName(title) {
    const book = await models.Book.findOne({ where: { title: title } });
    return book;
  }

  async findAllPublishers() {
    const books = await models.Book.findAll();
    let publishers = [];
    if (!books) {
      throw boom.notFound('Books not found');
    }
    books.forEach((book) => {
      if (!publishers.includes(book.publisher)) {
        publishers.push(book.publisher);
      }
    });
    publishers = publishers.sort();

    return publishers;
  }

  async getAllByPublisher(publisher) {
    const books = await models.Book.findAll({
      where: {
        publisher: publisher,
      },
    });
    if (!books) {
      throw boom.notFound('Books not found');
    }
    return books;
  }

  async updateDeleted(id_book) {
    const book = await this.findOne(id_book);
    if (!book) {
      return null;
    }
    const rta = await book.update({ deleted: true });
    return rta;
  }
}

module.exports = BookService;

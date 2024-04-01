const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');
const { Op } = require('sequelize');

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
      throw boom.notFound('Libro no encontrado');
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
      throw boom.notFound('Editoriales no encontradas');
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
      throw boom.notFound('Editoriales no encontradas');
    }
    return books;
  }

  async updateDeleted(id_book) {
    const book = await models.Book.findOne(id_book);
    if (!book) {
      return null;
    }
    const rta = await book.update({ deleted: true });
    return rta;
  }

  async updateBook(book_id, changes) {
    changes = {
      ...changes,
      img: changes.img ? changes.img : '/books/notAvailable.jpg',
    };

    const book = await models.Book.findByPk(book_id);
    if (!book) {
      return null;
    }
    const rta = await book.update(changes);
    return rta;
  }
  async getNewBooks() {
    const books = await models.Book.findAll({
      where: {
        pub_date: { [Op.gt]: new Date(2023, 12,31) },
        deleted: false,
      },
    });
    if (!books) {
      throw boom.notFound('Libros no encontrados');
    }
    return books;
  }
}

module.exports = BookService;

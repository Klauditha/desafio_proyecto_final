const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');
const { Op, JSON } = require('sequelize');
const OrderItemsService = require('../services/orderItems.service');
const { OrderItem } = require('../db/models/orderItems.model');
const { pool } = require('../config/db');

const orderItemsService = new OrderItemsService();

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
    if (books.length === 0) {
      throw boom.notFound('No existen libros para la editorial');
    }
    if (!books) {
      throw boom.notFound('No existen libros para la editorial');
    }
    return books;
  }

  async getAllActive() {
    const books = await models.Book.findAll({
      where: {
        deleted: false,
      },
    });
    if (!books) {
      throw boom.notFound('Libros no encontrados');
    }
    return books;
  }

  async getAll() {
    const books = await models.Book.findAll();
    if (!books) {
      throw boom.notFound('Libros no encontrados');
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
        pub_date: { [Op.gt]: new Date(2023, 12, 31) },
        deleted: false,
      },
    });
    if (!books) {
      throw boom.notFound('Libros no encontrados');
    }
    return books;
  }

  async getAllMoreSold() {
    try {
      const client = await pool.connect();
      const query =
        'select B.*, cast(count(OI.quantity) as integer)  quantitySold from books B INNER JOIN order_items OI ON B.book_id = OI.book_id  GROUP BY B.book_id  ORDER BY quantitySold DESC limit 10';
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      return null;
    }
  }
}

module.exports = BookService;

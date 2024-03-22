const BookService = require('../services/book.services');
const GenreService = require('../services/genre.service');
const BookGenreService = require('../services/bookGenre.service');
const AuthorService = require('../services/author.service');
const BookAuthorService = require('../services/bookAuthor.service');
const { bookSchema } = require('../schemas/book.schema');
const boom = require('@hapi/boom');

const service = new BookService();
const genreService = new GenreService();
const bookGenreService = new BookGenreService();
const authorService = new AuthorService();
const bookAuthorService = new BookAuthorService();

const createBook = (req, res, next) => {
  try {
    const body = req.body;
    const newBook = service.create(body);
    res.status(201).json({
      status: true,
      message: 'New book created',
      data: {
        book: newBook,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

/**
 * Obtiene un libro por su id con sus generos y autores
 */
const getBook = async (req, res, next) => {
  try {
    const { book_id } = req.params;
    const book = await service.findOne(book_id);
    const bookGenre = await bookGenreService.findOneByBook(book.book_id);
    if (bookGenre) {
      genre = await genreService.findOne(bookGenre.book_id);
    }
    const bookAuthor = await bookAuthorService.findOneByBook(book.book_id);
    if (bookAuthor) {
      author = await authorService.findOne(bookAuthor.book_id);
    }

    res.status(200).json({
      status: true,
      message: 'Book found',
      data: {
        book,
        genre: genre ?? null,
        author: author ?? null,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const updateBookById = (req, res, next) => {
  try {
    res.status(200).send('Libro actualizado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBookById = (req, res, next) => {
  try {
    res.status(200).send('Libro eliminado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBooksByCategory = (req, res, next) => {
  try {
    res.status(200).send('Libros por categoria');
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllBooks = (req, res, next) => {
  try {
    res.status(200).send('Libros');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getBook,
  getBooksByCategory,
  createBook,
  deleteBookById,
  updateBookById,
  getAllBooks,

};

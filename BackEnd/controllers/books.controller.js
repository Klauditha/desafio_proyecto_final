const BookService = require('../services/book.service');
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

/**
 * Crea un nuevo libro
 */
const createBook = async (req, res, next) => {
  try {
    const body = req.body;
    let bookGenre, bookAuthor = [];
    const newBook = await service.create(body);
    console.log(newBook);
    const genre = await genreService.findOne(newBook.book_id);
    if (genre) {
      bookGenre = await bookGenreService.create({
        book_id: newBook.book_id,
        genre: genre.genre_id,
      });
    } else {
      const newGenre = await genreService.create({
        name: body.genre,
      });
      bookGenre = await bookGenreService.create({
        book_id: newBook.book_id,
        genre: newGenre.genre_id,
      });
    }
    const author = await authorService.findOne(newBook.book_id);
    if (author) {
      bookAuthor = await bookAuthorService.create({
        book_id: newBook.book_id,
        author: author.author_id,
      });
    } else {
      const newAuthor = await authorService.create({
        name: body.author,
      });
      bookAuthor = await bookAuthorService.create({
        book_id: newBook.book_id,
        author: newAuthor.author_id,
      });
    }
    res.status(201).json({
      status: true,
      message: 'New book created',
      data: {
        book: newBook,
        genre: bookGenre,
        author: bookAuthor,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
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

/**
 * Actualiza un libro
 */
const updateBook = async (req, res, next) => {};

const deleteBook = async (req, res, next) => {};

const getBooksByCategory = async (req, res, next) => {};

const getAllBooks = async (req, res, next) => {};

/**
 * Obtiene todas las editoriales
 */
const findAllPublishers = async (req, res, next) => {
  try {
    const publishes = await service.findAllPublishers();
    res.status(200).json({
      status: true,
      message: 'Publishes found',
      data: {
        publishes,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllByPublisher = async (req, res, next) => {
  try {
    const { publisher } = req.body;
    console.log('Publisher:', publisher);
    const books = await service.getAllByPublisher(publisher);
    res.status(200).json({
      status: true,
      message: 'Books found',
      data: {
        books,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getBook,
  getBooksByCategory,
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  findAllPublishers,
  getAllByPublisher,
};

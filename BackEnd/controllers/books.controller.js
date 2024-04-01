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
    let bookGenre,
      bookAuthor,
      newGenre,
      newAuthor = [];
    const existBook = await service.findOneByName(body.title);
    if (existBook) {
      throw boom.conflict('Book already exists');
    }
    const newBook = await service.create(body);
    const genre = await genreService.findOneByName(body.genre);
    if (genre != null) {
      bookGenre = await bookGenreService.create({
        book_id: newBook.book_id,
        genre_id: genre.genre_id,
      });
    } else {
      newGenre = await genreService.createByName(body.genre);
      bookGenre = await bookGenreService.create({
        book_id: newBook.book_id,
        genre_id: newGenre.genre_id,
      });
    }
    const author = await authorService.findOneByName(body.author);
    if (author != null) {
      bookAuthor = await bookAuthorService.create({
        book_id: newBook.book_id,
        author_id: author.author_id,
      });
    } else {
      const newAuthor = await authorService.create({
        name: body.author,
      });
      bookAuthor = await bookAuthorService.create({
        book_id: newBook.book_id,
        author_id: newAuthor.author_id,
      });
    }
    res.status(201).json({
      status: true,
      message: 'New book created',
      data: {
        book: newBook,
        genre: genre != null ? genre : newGenre,
        author: author != null ? author : newAuthor,
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
      message: 'Libro encontrado',
      data: {
        book,
        genre: genre ?? null,
        author: author ?? null,
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
 * Actualiza un libro
 */
const updateBook = async (req, res, next) => {
  try {
    const { book_id } = req.params;
    const body = req.body;
    const existBook = await service.findOne(book_id);
    if (!existBook) {
      throw boom.notFound('Book not found');
    }
    const book = await service.updateBook(book_id, body);
    if (book == null) {
      throw boom.notFound('Book not found');
    }
    const bookGenre = await bookGenreService.updateByGenreBook(
      book_id,
      body.genre_id
    );
    const genre = await genreService.findOne(body.genre_id);
    if (!genre) {
      throw boom.notFound('Genre not found');
    }
    const bookAuthor = await bookAuthorService.updateByAuthorBook(
      book_id,
      body.author_id
    );
    const author = await authorService.findOne(body.author_id);
    if (!author) {
      throw boom.notFound('Author not found');
    }

    res.status(200).json({
      status: true,
      message: 'Book updated',
      data: {
        book,
        genre,
        author,
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

const deleteBook = async (req, res, next) => {
  try {
    const { book_id } = req.params;
    const existBook = await service.findOne(book_id);
    if (!existBook) {
      throw boom.notFound('Book not found');
    }
    const book = await service.updateDeleted(book_id);
    if (!book) {
      throw boom.notFound('Book not found');
    }
    const bookGenre = await bookGenreService.updateDeletedByBook(book.book_id);
    const bookAuthor = await bookAuthorService.updateDeletedByBook(
      book.book_id
    );

    res.status(200).json({
      status: true,
      message: 'Book deleted',
      data: {
        book,
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
      message: 'Editoriales encontradas',
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

/**
 * Obtiene todos los libros por editorial
 */
const getAllByPublisher = async (req, res, next) => {
  try {
    const { publisher } = req.body;
    const books = await service.getAllByPublisher(publisher);
    res.status(200).json({
      status: true,
      message: 'Editoriales encontradas',
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

const getNews = async (req, res, next) => {
  try {
    const books = await service.getNewBooks();
    res.status(200).json({
      status: true,
      message: 'Libros encontrados',
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
}

module.exports = {
  getBook,
  getBooksByCategory,
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  findAllPublishers,
  getAllByPublisher,
  getNews
};

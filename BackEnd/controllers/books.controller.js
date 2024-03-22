const BookService = require('../services/book.services');
const GenreService = require('../services/genre.service');
const BookGenreService = require('../services/bookGenre.service');
const { bookSchema } = require('../schemas/book.schema');
const boom = require('@hapi/boom');

const service = new BookService();
const genreService = new GenreService();
const bookGenreService = new BookGenreService();

const createBook = (req, res, next) => {
  try {
    const body = req.body;
    const newBook = service.create(body);
    console.log(newBook);
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

const getBook = async (req, res, next) => {
  console.log('getBook');
  try {
    //console.log(req.params);
    const { book_id } = req.params;
    //const genre = null;
    const book = await service.findOne(book_id);
    //console.log(book);
    //console.log(bookGenre);
    const bookGenre = await bookGenreService.findOneByBook(book.book_id);
    console.log(bookGenre);
    
    if (bookGenre) {
      genre = await genreService.findOne(bookGenre.book_id);
      console.log(bookGenre);
    }

    res.status(200).json({
      status: true,
      message: 'Book found',
      data: {
        book,
        genre: genre ?? null,
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

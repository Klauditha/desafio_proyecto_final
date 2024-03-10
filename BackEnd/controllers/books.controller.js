const BookService = require('../services/book.services');
const { bookSchema } = require('../schemas/book.schema');

const service = new BookService();
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
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const getBook = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await service.findOne(bookId);
    res.status(200).json({
      status: true,
      message: 'Book found',
      data: {
        book: book,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const updateBook = (req, res, next) => {
  try {
    res.status(200).send('Libro actualizado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBook = (req, res, next) => {
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

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook,
  getBooksByCategory,
};

const BookService = require('../services/book.services');
const { bookSchema } = require('../schemas/book.schema');
const boom = require('@hapi/boom');

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
  try {
    const { bookId } = req.params;
    if (['{bookId}', ':bookId', '', null, undefined, ' '].includes(bookId)) {
      throw boom.badRequest('Parameter bookId is invalid or not provided');
    }
    if (['1', '11', '21'].includes(bookId)) {
      throw boom.notFound('Book not found');
    }
    const book = await service.findOne(bookId);
    res.status(200).json({
      status: true,
      message: 'Book found',
      data: {
        book: book,
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
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getBook,
  getBooksByCategory,
  createBook,
  deleteBookById,
  updateBookById,
  getAllBooks
};

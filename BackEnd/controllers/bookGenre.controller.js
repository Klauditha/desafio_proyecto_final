const BookGenreService = require('../services/bookGenre.service');
const { bookSchema } = require('../schemas/book.schema');
const boom = require('@hapi/boom');

const service = new BookGenreService();

const getBookGenreByIdBook = async (req, res) => {
    const { book_id } = req.params;
    const bookGenre = await service.findOneByBook(book_id);
    res.status(200).json({
      status: true,
      message: 'BookGenre found',
      data: {
        bookGenre,
      },
    });
  };

  module.exports = {
    getBookGenreByIdBook,
  }
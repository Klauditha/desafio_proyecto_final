const BookAuthorService = require('../services/bookAuthor.service');
const { bookSchema } = require('../schemas/book.schema');
const boom = require('@hapi/boom');

const service = new BookAuthorService();

const getBookAuthorByIdBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const bookAuthor = await service.findOneByBook(book_id);
    res.status(200).json({
      status: true,
      message: 'BookAuthor found',
      data: {
        bookAuthor,
      },
    });  
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    })
  }
  
};

module.exports = {
  getBookAuthorByIdBook,
};

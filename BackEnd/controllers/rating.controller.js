const boom = require('@hapi/boom');
const RatingService = require('../services/rating.service');
const UserService = require('../services/user.service');
const BookService = require('../services/book.service');

const service = new RatingService();
const userService = new UserService();
const bookService = new BookService();

const createUpdateRating = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await userService.findById(body.user_id);
    if (!user) {
      throw boom.notFound('User not found');
    }

    const book = await bookService.findOne(body.book_id);
    if (!book) {
      throw boom.notFound('Book not found');
    }
    const rating = await service.create(body);
    res.status(201).json({
      status: true,
      message: 'Rating added',
      data: {
        rating,
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

module.exports = {
  createUpdateRating,
};

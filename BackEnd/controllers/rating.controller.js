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

const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await service.getWishlist(req.user.user_id);
    res.status(200).json({
      status: true,
      message: "Wishlist fetched",
      data: { wishlist },
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

const getCommentsByBook = async (req, res, next) => {
  try {
    const { book_id } = req.params;
    const comments = []
    const commentsData = await service.getCommentsByBook(book_id);
    if (!commentsData) {
      throw boom.notFound('Comments not found');
    }
    const users = await userService.findAll();
    commentsData.forEach((comment) => {
      let user = users.find(user => user.user_id == comment.user_id);
      comments.push({
        comment: comment.comment,
        user: user!==undefined ? user.first_name : null,
        score: comment.score,
        date: comment.created_at
      });
    })
    res.status(200).json({
      status: true,
      message: 'Comments found',
      data: {
        comments,
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
}
module.exports = {
  createUpdateRating,
  getCommentsByBook,
  getWishlist,
};

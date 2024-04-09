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

const getRatingByBook = async (req, res, next) => {
  try {
    const { book_id } = req.params;
    const rating = await service.getRatingByBook(book_id);
    res.status(200).json({
      status: true,
      message: 'Rating de libro encontrado',
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

const getWishlistByBook_User = async (req, res, next) => {
  try {
    const { book_id } = req.params;
    const wishlist = await service.getWishlistByBook_User(book_id, req.user.user_id);
    res.status(200).json({
      status: true,
      message: 'Wishlist de libro encontrado',
      data: {
        wishlist,
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

const addToWishlist = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const book_id = parseInt(req.params.book_id, 10);
    const { wishlist } = req.body;

    console.log(
      "user_id:",
      user_id,
      " book_id:",
      book_id,
      " wishlist:",
      wishlist
    );

    await service.updateWishlist(user_id, book_id, wishlist);

    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "No se ha logrado actualizar wishlist" });
  }
};


module.exports = {
  createUpdateRating,
  getCommentsByBook,
  getWishlist,
  getRatingByBook,
  getWishlistByBook_User,
  addToWishlist,
};

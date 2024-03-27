const userController = require('./user.controller');
const authorController = require('./author.controller');
const booksController = require('./books.controller');
const loginController = require('./login.controller');
const genreController = require('./genre.controller');
const ratingController = require('./rating.controller');
const booksGenreController = require('./bookGenre.controller');
const booksAuthorController = require('./bookAuthor.controller');
const cartController = require('./cartItem.controller');
const ordersController = require('./orders.controller');

module.exports = {
  userController,
  authorController,
  booksController,
  loginController,
  genreController,
  ratingController,
  booksGenreController,
  booksAuthorController,
  cartController,
  ordersController,
};

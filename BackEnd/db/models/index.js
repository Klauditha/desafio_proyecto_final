const { BookSchema, Book } = require('./book.model');
const { GenreSchema, Genre } = require('./genre.model');
const { AuthorSchema, Author } = require('./author.model');
const { RatingSchema, Rating } = require('./rating.model');
//const { UserSchema, User } = require('./user.model');
//const { CartSchema, Cart } = require('./cart.model');
const { OrderSchema, Order } = require('./orders.model');
const { BookAuthorSchema, BookAuthor } = require('./bookAuthor.model');
const { BookGenreSchema, BookGenre } = require('./bookGenre.model');

function setupModels(sequelize) {
  Book.init(BookSchema, Book.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
  Author.init(AuthorSchema, Author.config(sequelize));
  Rating.init(RatingSchema, Rating.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));

 /* User.init(UserSchema, User.config(sequelize));
  Cart.init(CartSchema, Cart.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));*/
  BookAuthor.init(BookAuthorSchema, BookAuthor.config(sequelize));
  BookGenre.init(BookGenreSchema, BookGenre.config(sequelize));
}

module.exports = setupModels;

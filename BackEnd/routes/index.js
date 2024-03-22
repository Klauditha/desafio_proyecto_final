const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const booksRouter = require('./books.router');
const loginRouter = require('./login.router');
const cartRouter = require('./cart.router');
const ordersRouter = require('./orders.router');
const ratingRouter = require('./rating.router');
const authorRouter = require('./author.router');
const genreRouter = require('./genre.router');
const bookGenreRouter = require('./booksGenre.router');
const bookAuthorRouter = require('./booksAuthor.router');

//middleware
router.use('/', loginRouter);
router.use('/user', userRouter);
router.use('/book', booksRouter);
router.use('/cart', cartRouter);
router.use('/orders', ordersRouter);
router.use('/rating', ratingRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);
router.use('/bookGenre', bookGenreRouter);
router.use('/bookAuthor', bookAuthorRouter);

module.exports = router;
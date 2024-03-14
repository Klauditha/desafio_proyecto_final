const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const booksRouter = require('./books.router');
const loginRouter = require('./login.router');
const cartRouter = require('./cart.router');
const ordersRouter = require('./orders.router');
const ratingRouter = require('./rating.router');
const authorRouter = require('./author.router');

//middleware
router.use('/', loginRouter);
router.use('/user', userRouter);
router.use('/book', booksRouter);
router.use('/cart', cartRouter);
router.use('/orders', ordersRouter);
router.use('/rating', ratingRouter);
router.use('/author', authorRouter);

module.exports = router;
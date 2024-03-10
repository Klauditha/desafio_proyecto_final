const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const autorRouter = require('./autor');
const editorialRouter = require('./editorial');
const libroRouter = require('./libro');
const categoriaRouter = require('./categoria');


//middleware
router.use('/user', userRouter);
router.use('/autor', autorRouter);
router.use('/editorial', editorialRouter);
router.use('/libro', libroRouter);
router.use('/categoria', categoriaRouter);

module.exports = router;
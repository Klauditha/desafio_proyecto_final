const express = require('express');
const router = express.Router();
const { booksAuthorController } = require('../controllers/index.js');

router.get('/:book_id', booksAuthorController.getBookAuthorByIdBook);

module.exports = router
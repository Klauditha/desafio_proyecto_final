const express = require('express');
const router = express.Router();

const { booksGenreController } = require('../controllers/index.js');
const { check } = require('express-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     BookGenre:
 *       type: object
 *       required:
 *         - bookId
 *         - genreId
 *       properties:
 *         bookId:
 *           type: number
 *           description: The id of the book
 *         genreId:
 *           type: number
 *           description: The id of the genre 
 *       example:
 *         bookId: 1
 *         genreId: 1
 */

router.get('/:book_id', booksGenreController.getBookGenreByIdBook);

module.exports = router
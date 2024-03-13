const express = require('express');
const router = express.Router();

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

module.exports = router
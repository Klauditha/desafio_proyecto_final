const express = require('express');
const router = express.Router();
const { booksAuthorController } = require('../controllers/index.js');
/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - cartItemId
 *         - cartId
 *         - bookId
 *         - quantity
 *       properties:
 *         cartItemId:
 *           type: number
 *           description: The id of the cart item
 *         cartId:
 *           type: number
 *           description: The id of the cart
 *         bookId:
 *           type: number
 *           description: The id of the book
 *         quantity:
 *           type: number
 *           description: The quantity of the book
 *       example:
 *         cartItemId: 1
 *         cartId: 1
 *         bookId: 1
 *         quantity: 1
 */

router.get('/:book_id', booksAuthorController.getBookAuthorByIdBook);

module.exports = router
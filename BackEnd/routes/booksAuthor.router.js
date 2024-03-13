const express = require('express');
const router = express.Router();

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


module.exports = router
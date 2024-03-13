const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       required:
 *         - orderId
 *         - userId
 *         - orderDate
 *         - total_amount
 *       properties:
 *         orderId:
 *           type: number
 *           description: The id of the order
 *         userId:
 *           type: number
 *           description: The id of the user
 *         orderDate:
 *           type: string
 *           description: The date of the order
 *         total_amount:
 *           type: number
 *           description: The total amount of the order
 *       example:
 *         orderId: 1
 *         userId: 1
 *         orderDate: 2022-01-01
 *         total_amount: 100
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - orderItemId
 *         - orderId
 *         - bookId
 *         - quantity
 *       properties:
 *         orderItemId:
 *           type: number
 *           description: The id of the order item
 *         orderId:
 *           type: number
 *           description: The id of the order
 *         bookId:
 *           type: number
 *           description: The id of the book
 *         quantity:
 *           type: number
 *           description: The quantity of the book
 *       example:
 *         orderItemId: 1
 *         orderId: 1
 *         bookId: 1
 *         quantity: 1
 */
module.exports = router
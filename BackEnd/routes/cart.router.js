const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - cartId
 *         - userId
 *         - bookId
 *         - quantity
 *       properties:
 *         cartId:
 *           type: number
 *           description: The id of the cart
 *         userId:
 *           type: number
 *           description: The id of the user
 *         bookId:
 *           type: number
 *           description: The id of the book
 *         quantity:
 *           type: number
 *           description: The quantity of the book
 *         example:
 *           cartId: 1
 *           userId: 2
 *           bookId: 3
 *           quantity: 1
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The Cart managing API
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: number
 *                 description: The id of the cart
 *               bookId:
 *                 type: number
 *                 description: The id of the book
 *               userId:
 *                 type: number
 *                 description: The id of the user
 *               quantity:
 *                 type: number
 *                 description: The quantity of the book
 *     responses:
 *       201:
 *         description: The item was added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *                   default: The item was added
 *                 data:
 *                   type: object
 *                   properties:
 *                     cart:
 *                       type: object
 *                       $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *                   default: Internal server error
 *                 data:
 *                   type: object
 *                   default: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *                   default: Unauthorized
 *                 data: 
 *                   type: object
 *                   default: null
 *
 * 
 * */
router.post('/');


module.exports = router
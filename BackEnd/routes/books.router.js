const express = require('express');
const router = express.Router();
const { booksController } = require('../controllers');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - book_id
 *         - isbn
 *         - img
 *         - title
 *         - description
 *         - language
 *         - pages
 *         - publisher
 *         - pub_date
 *         - price
 *         - stock
 *         - deleted
 *       properties:
 *         book_id:
 *           type: number
 *           description: The id of the book
 *         isbn:
 *           type: string
 *           description: The isbn of the book
 *         img:
 *           type: string
 *           description: The img of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         description:
 *           type: string
 *           description: The description of the book
 *         language:
 *           type: string
 *           description: The language of the book
 *         pages:
 *           type: number
 *           description: The pages of the book
 *         publisher:
 *           type: string
 *           description: The publisher of the book
 *         pub_date:
 *           type: date
 *           description: The pub_date of the book
 *         price:
 *           type: float
 *           description: The price of the book
 *         stock:
 *           type: number
 *           description: The stock of the book
 *         deleted:
 *           type: boolean
 *           description: The state of the book
 *       example:
 *         book_id: 3
 *         isbn: 9789569545344
 *         img: /books/3.jpg
 *         title: La casa de los espíritus
 *         description: Novela de la autora chilena Isabel Allende que relata la historia de varias generaciones de una familia.
 *         language: Español
 *         pages: 500
 *         publisher: Sudamericana
 *         pub_date: 1982-01-01
 *         price: 13990
 *         stock: 10
 *         deleted: false
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: The Book managing API
 * /book/{book_id}:
 *   get:
 *     summary: Get the book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: book_id
 *     responses:
 *       200:
 *         description: The book was get
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: boject
 *                   properties:
 *                     book:
 *                       $ref: '#/components/schemas/Book'
 *                     genre:
 *                       $ref: '#/components/schemas/Genre'
 *                     author:
 *                       $ref: '#/components/schemas/Author'
 *       404:
 *         description: The book was not found
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
 *                   default: The book was not found
 *                 data:
 *                   type: object
 *                   default: null
 *       500:
 *         description: Some server error
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
 *
 */
router.get('/:book_id', booksController.getBook);

module.exports = router;

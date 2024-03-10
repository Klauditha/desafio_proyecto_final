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
 *       properties:
 *         bookId:
 *           type: string
 *           description: The auto-generated id of the book
 *         isbn:
 *           type: string
 *           description: The isbn of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         pubDate:
 *           type: datetime
 *           description: The publication date of the book
 *         price:
 *           type: number
 *           description: The price of the book
 *         stock:
 *           type: number
 *           description: The stock of the book
 *       example:
 *         book_id: 1
 *         isbn: 123456
 *         title: El Principito
 *         author: Antoine de Saint-Exupery
 *         pubDate: 2020-01-01
 *         price: 10
 *         stock: 10
 */

/*
Ruta: POST /api/libro
Descripcion: Crea un nuevo libro
request: body: 
response: { estado : boolean , message : string , data : object libro }
*/
//router.post('/', booksController.createBook);

/*
Ruta: PUT /api/libro
Descripcion: Modifica un libro
request: body: { token : string, libro : object }
response: { estado : boolean , message : string , data : object libro }
*/
//router.put('/', booksController.updateBook);

/*
Ruta: DELETE /api/libro
Descripcion: Modifica un libro
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object libro }
*/
//router.delete('/', booksController.deleteBook);

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: The Book managing API
 * /book/{bookId}:
 *   get:
 *     summary: Get the book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: bookId
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
 *                   type: object
 *                   properties:
 *                     book:
 *                       $ref: '#/components/schemas/Book'
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
router.get('/:bookId', booksController.getBook);

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: The Book managing API
 * /books/getByCategory/{idCategory}:
 *   get:
 *     summary: Get the books by category
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: idCategory
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
 *                   type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
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
//router.get('/', booksController.getBooksByCategory);

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: The Book managing API
 * /books/getByAuthor/{idAuthor}:
 *   get:
 *     summary: Get the books by author
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: idAuthor
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
 *                   type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
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
//router.get('/', booksController.getBooksByAuthor);

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: The Book managing API
 * /books/setStockById/{idBook}:
 *   post:
 *     summary: Get the books by author
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: idBook
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: number
 *                 default: 0
 *     security: 
 *       - bearerAuth: []
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
 *                   type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
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
//router.get('/', booksController.setStockById);

module.exports = router;

const express = require('express');
const router = express.Router();
const { booksController } = require('../controllers');
const { validarCampos } = require('../middlewares/validation.handler.js');
const { check } = require('express-validator');
const { authMiddleware } = require('../middlewares/auth.handler.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - bookId
 *         - isbn
 *         - img
 *         - title
 *         - language
 *         - pages
 *         - publisher
 *         - pub_date
 *         - price
 *         - stock
 *       properties:
 *         bookId:
 *           type: string
 *           description: The auto-generated id of the book
 *         isbn:
 *           type: string
 *           description: The isbn of the book
 *         img:
 *           type: string
 *           description: The img of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         language:
 *           type: string
 *           description: The language of the book
 *         pages:
 *           type: number
 *           description: The pages of the book
 *         publisher:
 *           type: string
 *           description: The publisher of the book
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
 *         img: https://via.placeholder.com/150
 *         title: El Principito
 *         language: Spanish
 *         pages: 300
 *         publisher: Random
 *         pubDate: 2020-01-01
 *         price: 10000
 *         stock: 10
 */

/*
Ruta: POST /api/libro
Descripcion: Crea un nuevo libro
request: body: 
response: { estado : boolean , message : string , data : object libro }
*/

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
router.get('/:bookId', booksController.getBook);

/**
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
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *                 default: The title of your book
 *               isbn:
 *                 type: string
 *                 description: The isbn of the book
 *                 default: 123456789
 *               img:
 *                 type: string
 *                 description: The img of the book
 *                 default: http://www.example.com/image.jpg
 *               language:
 *                 type: string
 *                 description: The language of the book
 *                 default: English
 *               pages:
 *                 type: number
 *                 description: The pages of the book
 *                 default: 100
 *               publisher:
 *                 type: string
 *                 description: The publisher of the book
 *                 default: publisher
 *               pubDate:
 *                 type: date
 *                 description: The pubDate of the book
 *                 default: 2020-01-01
 *               price:
 *                 type: number
 *                 description: The price of the book
 *                 default: 10000
 *               stock:
 *                 type: number
 *                 description: The stock of the book
 *                 default: 10
 *               authorId:
 *                 type: number
 *                 description: The id of the author
 *                 default: 1
 *               genreId:
 *                 type: number
 *                 description: The id of the genre
 *                 default: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: The book was created
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
router.post(
  '/',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('isbn', 'The isbn is required').not().isEmpty(),
    check('img', 'The img is required').not().isEmpty(),
    check('language', 'The language is required').not().isEmpty(),
    check('pages', 'The pages is required').not().isEmpty(),
    check('publisher', 'The publisher is required').not().isEmpty(),
    check('pub_date', 'The pub_date is required').not().isEmpty(),
    check('stock', 'The stock is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('authorId', 'The authorId is required').not().isEmpty(),
    check('genreId', 'The genreId is required').not().isEmpty(),
    validarCampos,
  ],
  authMiddleware,
  booksController.createBook
);
/**
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

const express = require('express');
const router = express.Router();
const { booksController } = require('../controllers');
const { authMiddleware } = require('../middlewares/auth.handler');
const { validarCampos } = require('../middlewares/validation.handler');
const { check } = require('express-validator');

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
 *         description: Libro encontrado
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
 *                   default: Libro encontrado
 *                 data:
 *                   type: array
 *                   properties:
 *                     book:
 *                       $ref: '#/components/schemas/Book'
 *                     genre:
 *                       $ref: '#/components/schemas/Genre'
 *                     author:
 *                       $ref: '#/components/schemas/Author'
 *       404:
 *         description: El libro no fue encontrado
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
 *                   default: Libro no encontrado
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

/**
 * @swagger
 * /book/allPublishers:
 *   post:
 *     summary: Get all publishers
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                publisher:
 *                  type: string
 *                  description: The publisher of the book
 *     responses:
 *       200:
 *         description: Editoriales encontradas
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
 *                   default: Editoriales encontradas
 *                 data:
 *                   type: array
 *                   items:
 *                     editoriales:
 *                       type: string
 *                       default: Sudamericana
 *       404:
 *         description: No se encontraron editoriales
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
 *                   default: No se encontraron editoriales
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
 * */
router.post('/allPublishers', booksController.findAllPublishers);

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Create a new book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                isbn:
 *                  type: string
 *                  description: The isbn of the book
 *                img:
 *                  type: string
 *                  description: The img of the book
 *                title:
 *                  type: string
 *                  description: The title of the book
 *                description:
 *                  type: string
 *                  description: The description of the book
 *                language:
 *                  type: string
 *                  description: The language of the book
 *                pages:
 *                  type: number
 *                  description: The pages of the book
 *                publisher:
 *                  type: string
 *                  description: The publisher of the book
 *                pub_date:
 *                  type: date
 *                  description: The pub_date of the book
 *                price:
 *                  type: float
 *                  description: The price of the book
 *                stock:
 *                  type: number
 *                  description: The stock of the book
 *                genre:
 *                  type: string
 *                  description: The genre of the book
 *                author:
 *                  type: string
 *                  description: The author of the book
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The book was created
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
 *                   default: The book was created
 *                 data:
 *                   type: array
 *                   items:
 *                     book:
 *                       $ref: '#/components/schemas/Book'
 *                     genre:
 *                       $ref: '#/components/schemas/Genre'
 *                     author:
 *                       $ref: '#/components/schemas/Author'
 *       409:
 *         description: The book already exists
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
 *                   default: The book already exists
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
 * */
router.post(
  '/',
  [
    check('isbn', 'The isbn is required').not().isEmpty(),
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('language', 'The language is required').not().isEmpty(),
    check('pages', 'The pages is required').not().isEmpty(),
    check('publisher', 'The publisher is required').not().isEmpty(),
    check('pub_date', 'The pub_date is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('stock', 'The stock is required').not().isEmpty(),
    check('genre', 'The genre is required').not().isEmpty(),
    check('author', 'The author is required').not().isEmpty(),
    validarCampos,
  ],
  //authMiddleware,
  booksController.createBook
);

/**
 * @swagger
 * /book/delete/{book_id}:
 *   put:
 *     summary: Disable a book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: book_id
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The book was disable
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
 *                   default: The book was disable
 *                 data:
 *                   type: object
 *                   schema:
 *                     $ref: '#/components/schemas/Book'
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
 * */
router.put('/delete/:book_id', authMiddleware, booksController.deleteBook);

/**
 * @swagger
 * /book/{book_id}:
 *   put:
 *     summary: Update a book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: book_id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *                 description: The isbn of the book
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               description:
 *                 type: string
 *                 description: The description of the book
 *               language:
 *                 type: string
 *                 description: The language of the book
 *               pages:
 *                 type: number
 *                 description: The pages of the book
 *               publisher:
 *                 type: string
 *                 description: The publisher of the book
 *               pub_date:
 *                 type: string
 *                 description: The pub_date of the book
 *               price:
 *                 type: number
 *                 description: The price of the book
 *               stock:
 *                 type: number
 *                 description: The stock of the book
 *               genre_id:
 *                 type: number
 *                 description: The genre_id of the book
 *               author_id:
 *                 type: number
 *                 description: The author_id of the book
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The book was updated
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
 *                   default: The book was updated
 *                 data:
 *                   type: array
 *                   items:
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
 * */
router.put(
  '/:book_id',
  [
    check('isbn', 'The isbn is required').not().isEmpty(),
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('language', 'The language is required').not().isEmpty(),
    check('pages', 'The pages is required').not().isEmpty(),
    check('publisher', 'The publisher is required').not().isEmpty(),
    check('pub_date', 'The pub_date is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('stock', 'The stock is required').not().isEmpty(),
    check('genre_id', 'The genre_id is required').not().isEmpty(),
    check('author_id', 'The author_id is required').not().isEmpty(),
    validarCampos,
  ],
  authMiddleware,
  booksController.updateBook
);
module.exports = router;

const express = require('express');
const { authMiddleware } = require('../middlewares/auth.handler');
const router = express.Router();
const { ratingController } = require('../controllers/index');
const { validarCampos } = require('../middlewares/validation.handler');
const { check } = require('express-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       required:
 *         - rating_id
 *         - user_id
 *         - book_id
 *         - score
 *         - comment
 *         - whishlist
 *         - created_at
 *         - updated_at
 *         - deleted
 *       properties:
 *         rating_id:
 *           type: number
 *           description: The id of the valuation
 *         user_id:
 *           type: number
 *           description: The id of the user
 *         book_id:
 *           type: number
 *           description: The id of the book
 *         score:
 *           type: number
 *           description: The score of the book
 *         comment:
 *           type: string
 *           description: The comment of the book
 *         whishlist:
 *           type: boolean
 *           description: The whishlist of the book
 *         created_at:
 *           type: timestamp
 *           description: The date of the valuation
 *         updated_at:
 *           type: timestamp
 *           description: The date of the valuation
 *         deleted:
 *           type: boolean
 *           description: The status of the valuation
 *       example:
 *         rating_id: 3
 *         user_id: 3
 *         book_id: 3
 *         comment: Me encantó, muy recomendado.
 *         whishlist: false
 *         created_at: 2023-03-31T10:00:00
 *         updated_at: 2023-03-31T10:00:00
 *         deleted: false
 */

/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: The Rating managing API
 * /rating:
 *   post:
 *     summary: Add rating to a book
 *     tags: [Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 description: The id of the user
 *               book_id:
 *                 type: number
 *                 description: The id of the book
 *               score:
 *                 type: number
 *                 description: The score of the book
 *               comment:
 *                 type: string
 *                 description: The comment of the book
 *               whishlist:
 *                 type: boolean
 *                 description: The whishlist of the book
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: The rating was created
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
 *                   default: The rating was created
 *                 data:
 *                   type: object
 *                   properties:
 *                     rating:
 *                       type: object
 *                       $ref: '#/components/schemas/Rating'
 *       500:
 *         description: The rating was not created
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

router.post(
  '/',
  [
    check('user_id', 'The user is required').not().isEmpty(),
    check('book_id', 'The book is required').not().isEmpty(),
    check('score', 'The score is required').not().isEmpty(),
    check('comment', 'The comment is required').not().isEmpty(),
    check('wishlist', 'The wishlist is required').not().isEmpty(),
    validarCampos,
  ],
  authMiddleware,
  ratingController.createUpdateRating
);

/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: The Rating managing API
 * /rating/comments/{book_id}:
 *   get:
 *     summary: Get comments by book
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         schema:
 *           type: number
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The comments were get
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
 *                   default: The comments were get
 *                 data:
 *                   type: object
 *                   properties:
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           comment:
 *                             type: string
 *                           user:
 *                             type: string
 *                           score:
 *                             type: number
 *                           date:
 *                             type: string
 *       404:
 *         description: The comments were not get
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
 *                   default: The comments were not get
 *                 data:
 *                   type: object
 *                   default: null
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
 * */
router.get('/comments/:book_id', ratingController.getCommentsByBook);

module.exports = router;

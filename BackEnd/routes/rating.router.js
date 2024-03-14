const express = require('express');
const { authMiddleware } = require('../middlewares/auth.handler');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       required:
 *         - ratingId
 *         - userId
 *         - bookId
 *         - score
 *         - comment
 *         - whishlist
 *         - createdAt
 *       properties:
 *         ratingId:
 *           type: number
 *           description: The id of the valuation
 *         userId:
 *           type: number
 *           description: The id of the user
 *         bookId:
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
 *         createdAt:
 *           type: timestamp
 *           description: The date of the valuation
 *         updatedAt:
 *           type: timestamp
 *           description: The date of the valuation
 *       example:
 *         ratingId: 1
 *         userId: 1
 *         bookId: 1
 *         score: 1
 *         comment: "comment"
 *         whishlist: true
 *         createdAt: 2022-01-01
 *         updatedAt: 2022-01-01
 */

/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: The Rating managing API
 * /rating:
 *   post:
 *     summary: Create a new rating
 *     tags: [Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 description: The id of the user
 *               bookId:
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
router.post('/');
module.exports = router
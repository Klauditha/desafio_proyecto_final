const express = require('express');
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
module.exports = router
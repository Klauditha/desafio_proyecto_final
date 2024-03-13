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
 *       properties:
 *         cartId:
 *           type: number
 *           description: The id of the cart
 *         userId:
 *           type: number
 *           description: The id of the user
 *       example:
 *         cartId: 1
 *         userId: 1
 */


module.exports = router
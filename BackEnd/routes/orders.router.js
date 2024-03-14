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
 * tags:
 *   name: Orders
 *   description: The Orders managing API
 * /orders/{userId}:
 *   get:
 *     summary: Get all orders by user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The orders were found
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
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Orders'
 *       404:
 *         description: The orders were not found
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
 */
router.get('/:userId');

module.exports = router;

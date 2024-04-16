const express = require('express');
const { check } = require('express-validator');
const { authMiddleware } = require('../middlewares/auth.handler');
const router = express.Router();
const { ordersController } = require('../controllers');

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       required:
 *         - order_id
 *         - user_id
 *         - order_date
 *         - total_amount
 *         - deleted
 *       properties:
 *         order_id:
 *           type: number
 *           description: The id of the order
 *         user_id:
 *           type: number
 *           description: The id of the user
 *         order_date:
 *           type: string
 *           description: The date of the order
 *         total_amount:
 *           type: number
 *           description: The total amount of the order
 *         deleted:
 *           type: boolean
 *           description: The status of the order
 *       example:
 *         order_id: 1
 *         user_id: 1
 *         order_date: '2022-01-01'
 *         total_amount: 48000
 *         deleted: false
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The Orders managing API
 * /orders/all/{user_id}:
 *   get:
 *     summary: Get all orders by user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: user_id
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: Orders found
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
 *                   default: The orders were get
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Orders'
 *       409:
 *         description: The orders does not exist
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
 *                   default: The orders does not exist
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
router.get('/all/:user_id', authMiddleware, ordersController.getAllByUser);

router.post(
  '/createbyuser/:user_id',
  authMiddleware,
  ordersController.createOrderByUser
);
module.exports = router;

const express = require('express');
const router = express.Router();
const { booksController } = require('../controllers');

/**
 * @swagger
 * tags:
 *   name: Publisher
 *   description: The Publisher managing API
 * /publisher/all:
 *   post:
 *     summary: Get all publishers
 *     tags: [Publisher]
 *     responses:
 *       200:
 *         description: The list of publishers was get
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
 *                     publishers:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: The list of publishers was not found
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
 *                   default: The list of publishers was not found
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
router.post('/all', booksController.findAllPublishers);

module.exports = router;

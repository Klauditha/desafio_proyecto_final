const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers');
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         username: John
 *         password: 123456
 */

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: The Login managing API
 * /login:
 *   post:
 *     summary: The login of the user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              username:
 *                 type: string
 *                 default: 0
 *              password:
 *                 type: string
 *                 default: 0
 *     responses:
 *       200:
 *         description: The user was authenticated
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
 *                   default: token
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
router.post('/', loginController.loginUser);

module.exports = router;

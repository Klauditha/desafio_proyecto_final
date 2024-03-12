const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers');
const { authMiddleware } = require('../middlewares/auth.handler');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validation.handler');
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
 *                 default: null
 *              password:
 *                 type: string
 *                 default: null
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
 *                   default: User is logged in
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
  *       401:
 *         description: The user was not authenticated
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
 *                   default: Credentials are not valid
 *                 data:
 *                   type: object
 *                   default: null
 */

router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validarCampos,
  ],
  loginController.loginUser
);

module.exports = router;

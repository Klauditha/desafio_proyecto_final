const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.handler.js');
const { userController } = require('../controllers/index.js');
const { validarCampos } = require('../middlewares/validation.handler.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - username
 *         - password
 *       properties:
 *         userId:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user name of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         firstName:
 *           type: boolean
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         phone:
 *           type: string
 *           description: The phone of the user
 *         region:
 *           type: string
 *           description: The region of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         zipCode:
 *           type: string
 *           description: The zip code of the user
 *       example:
 *         id: 1
 *         username: johndoe
 *         password: mysecretpassword
 *         firstName: John
 *         lastName: Doe
 *         phone: 123456789
 *         region: Region
 *         address: Address
 *         zipCode: 123
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: User created
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       $ref: '#/components/schemas/User'
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
router.post('/', userController.createUser);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /user:
 *   put:
 *     summary: Update the user
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: idUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       201:
 *         description: The user was successfully updated
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
 *                   $ref: '#/components/schemas/User'
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
 * 
 * 
 */
//router.put('/', authMiddleware, userController.updateUsuario);

/*
Ruta: DELETE /api/usuario
Descripcion: Modifica un usuario
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object usuario }
*/
//router.delete('/', authMiddleware, userController.deleteUsuario);

/*
Ruta: GET /api/usuario
Descripcion: btiene un usuario por id
request: body: { token : string, id : string }
response: { estado : boolean , message : string , data : object usuario }
*/
//router.get('/', authMiddleware, userController.getUsuario);

module.exports = router;

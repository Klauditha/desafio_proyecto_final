const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.handler.js');
const { userController } = require('../controllers/index.js');
const { validarCampos } = require('../middlewares/validation.handler.js');
const { check } = require('express-validator');

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
 *         - email
 *         - firstName
 *         - lastName
 *         - phone
 *         - region
 *         - address
 *         - zipCode
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
 *         email:
 *           type: string
 *           description: The email of the user
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
 *         userId: 1
 *         username: johndoe
 *         password: mysecretpassword
 *         email: johndoe@me.com
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
 *              properties:
 *                  username:
 *                      type: string
 *                      description: The user name of the user
 *                      default: johndoe
 *                  password:
 *                      type: string
 *                      description: The password of the user
 *                      default: mysecretpassword
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                      default: johndoe@me.com
 *                  firstName:
 *                      type: boolean
 *                      description: The first name of the user
 *                      default: John
 *                  lastName:
 *                      type: string
 *                      description: The last name of the user
 *                      default: Doe
 *                  phone:
 *                      type: string
 *                      description: The phone of the user
 *                      default: 123456789
 *                  region:
 *                      type: string
 *                      description: The region of the user
 *                      default: Region
 *                  address:
 *                      type: string
 *                      description: The address of the user
 *                      default: Los angeles 123
 *                  zipCode:
 *                      type: string
 *                      description: The zip code of the user
 *                      default: 123
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
 *       409:
 *         description: The user already exists
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
 *                   default: User already exists
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
router.post(
  "/",
/*   authMiddleware, */ //Activar flag si se quiere que la creacion de usuario requiera token
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("first_name", "First name is required").not().isEmpty(),
    check("last_name", "Last name is required").not().isEmpty(),
    check("phone", "Phone is required").not().isEmpty(),
    check("region", "Region is required").not().isEmpty(),
    check("country", "Country is required").not().isEmpty(),
    check("city", "City is required").not().isEmpty(),
    check("district", "District is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("zip_code", "Zip code is required").not().isEmpty(),
    validarCampos,
  ],
  userController.createUser
);

// DELETE /user/:user_id
router.delete('/:user_id', authMiddleware, userController.deleteUser);

/**
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
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /user/{userId}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
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
 *         description: User found
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
 *       404:
 *         description: User not found
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
 *                   default: User not found
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
router.get(
  '/:user_id',
  authMiddleware,
  userController.getUser
);

module.exports = router;

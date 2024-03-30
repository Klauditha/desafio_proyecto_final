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
 *         - user_id
 *         - username
 *         - email
 *         - password
 *         - deleted
 *       properties:
 *         user_id:
 *           type: number
 *           description: The id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         deleted:
 *           type: boolean
 *           description: The deleted of the user
 *       example:
 *         user_id: 1
 *         username: user
 *         email: 6HsQH@example.com
 *         password: password
 *         deleted: false
 */


/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /user/{user_id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [User]
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
 *         description: The user was found
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
 *                   default: Usuario encontrado
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'          
 *       404: 
 *         description: The user was not found
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
 *                   default: The user was not found
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
router.get('/:user_id', authMiddleware, userController.getUser);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /user/byusername/:username:
 *   get:
 *     summary: Get a user by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The user was found
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
 *                   default: Usuario encontrado
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'          
 *       404: 
 *         description: The user was not found
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
 *                   default: The user was not found
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
router.get(
  '/byusername/:username',
  authMiddleware,
  userController.getUserByUsername
);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
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
  '/',
  // authMiddleware, //Activar si se quiere que la creacion de usuario requiera token
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('region', 'Region is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('district', 'District is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('zip_code', 'Zip code is required').not().isEmpty(),
    validarCampos,
  ],
  userController.createUser
);


router.delete('/:user_id', authMiddleware, userController.deleteUser);

router.put('/:user_id', authMiddleware, userController.updateUser);

module.exports = router;

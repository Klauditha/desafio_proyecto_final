const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.handler');
const { cartController } = require('../controllers');
const { validarCampos } = require('../middlewares/validation.handler');
const { check } = require('express-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - cart_item_id
 *         - user_id
 *         - book_id
 *         - quantity
 *         - deleted
 *       properties:
 *         cart_item_id:
 *           type: number
 *           description: The id of the cart item
 *         user_id:
 *           type: number
 *           description: The id of the user
 *         book_id:
 *           type: number
 *           description: The id of the book
 *         quantity:
 *           type: number
 *           description: The quantity of the book
 *         deleted:
 *           type: boolean
 *           description: The state of the cart item
 *       example:
 *         cart_item_id: 1
 *         user_id: 1
 *         book_id: 11
 *         quantity: 5
 *         deleted: false
 */

/**
 * @swagger
 * tags:
 *   name: CartItem
 *   description: The cart items managing API
 * /cart/{user_id}:
 *   get:
 *     summary: Get all cart items by user
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: user_id
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *        200:
 *          description: The cart items were found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/CartItem'
 *        409:
 *          description: The cart items does not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Internal server error
 *                  data:
 *                    type: object
 *                    default: null
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Internal server error
 *                  data:
 *                    type: object
 *                    default: null
 * 
 */
router.get('/:user_id', authMiddleware, cartController.getCartItemsByUser);

/**
 * @swagger
 * tags:
 *   name: CartItem
 *   description: The cart items managing API
 * /cart/{cart_item_id}:
 *   put:
 *     summary: Update cart item
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: cart_item_id
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
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 description: The id of the user
 *               book_id:
 *                 type: number
 *                 description: The id of the book
 *               quantity:
 *                 type: number
 *                 description: The quantity of the book
 *               deleted:
 *                 type: boolean
 *                 description: The state of the cart item
 *     responses:
 *        200:
 *          description: The cart item was updated
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/CartItem'
 *        409:
 *          description: The cart item does not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Internal server error
 *                  data:
 *                    type: object
 *                    default: null
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Internal server error
 *                  data:
 *                    type: object
 *                    default: null
 */
router.put(
  '/:cart_item_id',
  [
    check('user_id', 'The user is required').not().isEmpty(),
    check('book_id', 'The book is required').not().isEmpty(),
    check('quantity', 'The quantity is required').not().isEmpty(),
    check('deleted', 'The deleted is required').not().isEmpty(),
    validarCampos,
  ],
  authMiddleware,
  cartController.updateCartItem
);

router.delete("/:cart_item_id", authMiddleware, cartController.deleteCartItem);

/**
 * @swagger
 * tags:
 *   name: CartItem
 *   description: The cart items managing API
 * /cart:
 *   post:
 *     summary: Create cart item
 *     tags: [CartItem]
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
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 description: The id of the user
 *               book_id:
 *                 type: number
 *                 description: The id of the book
 *               quantity:
 *                 type: number
 *                 description: The quantity of the book
 *     responses:
 *        201:
 *          description: The cart item was created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  message:
 *                    type: string
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/CartItem'
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Internal server error
 *                  data:
 *                    type: object
 *                    default: null
 */ 
 router.post(
    '/',
    [
      check('user_id', 'The user is required').not().isEmpty(),
      check('book_id', 'The book is required').not().isEmpty(),
      check('quantity', 'The quantity is required').not().isEmpty(),
      validarCampos,
    ],
    authMiddleware,
    cartController.createCartItem
  );

module.exports = router;
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.handler.js');
const { authorController } = require('../controllers/index.js');
const { validarCampos } = require('../middlewares/validation.handler.js');
const { check } = require('express-validator');
/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *        - authorId
 *        - name
 *        - state
 *        - createdAt
 *        - updatedAt
 *       properties:
 *         authorId:
 *           type: number
 *           description: The id of the author
 *         name:
 *           type: string
 *           description: The name of the author
 *         state:
 *           type: boolean
 *           description: The state of the author
 *         createdAt:
 *           type: date
 *           description: The creation date of the author
 *         updatedAt:
 *           type: date
 *           description: The update date of the author
 *       example:
 *         authorId: 1
 *         name: Juan
 *         state: true
 *         createdAt: 2022-01-01
 *         updatedAt: 2022-01-01
 */

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/{authorId}:
 *   get:
 *     summary: Get the author
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: authorId
 *     responses:
 *       200:
 *         description: The author was found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Author found
 *                 data:
 *                   type: object
 *                   properties:
 *                     author:
 *                       type: object
 *                       $ref: '#/components/schemas/Author'
 *       409:
 *         description: The author does not exist
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
 *                   default: Author not found
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
router.get('/:authorId', authMiddleware, authorController.deleteAuthorById);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/all:
 *   get:
 *     summary: Get all the authors active
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: The authors were found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Authors found
 *                 data:
 *                   type: object
 *                   properties:
 *                     authors:
 *                       type: object
 *                       $ref: '#/components/schemas/Author'
 *       409:
 *         description: The authors does not exist
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
 *                   default: Authors not found
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
router.get('/all', authorController.getAuthors);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author:
 *   post:
 *     summary: Create a new user
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                  name:
 *                     type: string
 *                     description: The name of the user
 *                     default: johndoe
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       201:
 *         description: The author was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Author created
 *                 data:
 *                   type: object
 *                   properties:
 *                     author:
 *                       type: object
 *                       $ref: '#/components/schemas/Author'
 *       409:
 *         description: The author already exists
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
 *                   default: Author already exists
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
  [check('name', 'The name is required').not().isEmpty(), validarCampos],
  authMiddleware,
  authorController.createAuthor
);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/{authorId}:
 *   put:
 *     summary: Update the author
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: authorId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                  name:
 *                     type: string
 *                     description: The name of the user
 *                     default: johndoe
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The author was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Author updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     author:
 *                       type: object
 *                       $ref: '#/components/schemas/Author'
 *       409:
 *         description: The author does not exist
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
 *                   default: Author not found
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
router.put(
  '/:authorId',
  [check('name', 'The name is required').not().isEmpty(), validarCampos],
  authMiddleware,
  authorController.updateAuthorById
);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/{authorId}:
 *   delete:
 *     summary: Delete the author
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: authorId
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The author was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Author deleted
 *                 data:
 *                   type: object
 *                   properties:
 *                     author:
 *                       type: object
 *                       $ref: '#/components/schemas/Author'
 *       409:
 *         description: The author does not exist
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
 *                   default: Author not found
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
router.delete('/:authorId', authMiddleware, authorController.deleteAuthorById);

module.exports = router;

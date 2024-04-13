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
 *        - author_id
 *        - name
 *        - deleted
 *       properties:
 *         author_id:
 *           type: number
 *           description: The id of the author
 *         name:
 *           type: string
 *           description: The name of the author
 *         deleted:
 *           type: boolean
 *           description: The state of the author
 *       example:
 *         author_id: 3
 *         name: Isabel Allende
 *         deleted: false
 */

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/{author_id}:
 *   get:
 *     summary: Get the author
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: author_id
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
router.get('/:author_id', authorController.getAuthor);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/all:
 *   post:
 *     summary: Get all the authors
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
 *                   default: Autores encontrados
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Author'
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
router.post('/all', authorController.getAuthors);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/allActive:
 *   post:
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
 *                   default: Autores activos encontrados
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Author'
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
router.post('/allActive', authorController.getAuthorsActive);

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
 *                     description: The name of the author
 *                     default: Gabriel Garcia Marquez
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
 * /author/{author_id}:
 *   put:
 *     summary: Update the author
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: author_id
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
  '/:author_id',
  [check('name', 'The name is required').not().isEmpty(), validarCampos],
  authMiddleware,
  authorController.updateAuthor
);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/{author_id}:
 *   delete:
 *     summary: Desactivate the author
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
 *         description: The author was desactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Autor desactivado
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
 *                   default: Autor no encontrado
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
router.delete('/:author_id', authMiddleware, authorController.deleteAuthor);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: The Author managing API
 * /author/activate/{author_id}:
 *   put:
 *     summary: Activate the author
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: author_id
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The author was activated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Autor activado
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
 *                   default: Autor no encontrado
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
  '/activate/:author_id',
  authMiddleware,
  authorController.activateAuthor
);

module.exports = router;

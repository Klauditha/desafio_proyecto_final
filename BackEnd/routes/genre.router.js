const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.handler.js');
const { genreController } = require('../controllers/index.js');
const { validarCampos } = require('../middlewares/validation.handler.js');
const { check } = require('express-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - genre_id
 *         - name
 *         - deleted
 *       properties:
 *         genre_id:
 *           type: number
 *           description: The id of the genre
 *         name:
 *           type: string
 *           description: The name of the genre
 *         deleted:
 *           type: boolean
 *           description: The state of the genre
 *       example:
 *         genre_id: 9
 *         name: Filosofía
 *         deleted: false
 */

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre/{genre_id}:
 *   get:
 *     summary: Get the genre
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: genre_id
 *     responses:
 *       200:
 *         description: The genre was found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Genre found
 *                 data:
 *                   type: object
 *                   properties:
 *                     genre:
 *                       type: object
 *                       $ref: '#/components/schemas/Genre'
 *       409:
 *         description: The genre does not exist
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
 *                   default: Genre not found
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
router.get('/:genre_id', genreController.getGenre);

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre/all:
 *   post:
 *     summary: Get all the genres
 *     tags: [Genre]
 *     responses:
 *       200:
 *         description: The genres were found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Genres found
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Genre'
 *       409:
 *         description: The genres does not exist
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
 *                   default: Genres not found
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
router.post('/all', genreController.getGenres);

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre/allActive:
 *   post:
 *     summary: Get all the genres active
 *     tags: [Genre]
 *     responses:
 *       200:
 *         description: The genres were found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Genres found
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Genre'
 *       409:
 *         description: The genres does not exist
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
 *                   default: Genres not found
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
router.post('/allActive', genreController.getGenresActive);

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genre]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                  name:
 *                     type: string
 *                     description: The name of the genre
 *                     default: Horror
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       201:
 *         description: The genre was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Genre created
 *                 data:
 *                   type: object
 *                   properties:
 *                     genre:
 *                       type: object
 *                       $ref: '#/components/schemas/Genre'
 *       409:
 *         description: The genre already exists
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
 *                   default: Genre already exists
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
  genreController.createGenre
);

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre/{genre_id}:
 *   put:
 *     summary: Update the genre
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: genre_id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                  name:
 *                     type: string
 *                     description: The name of the genre
 *                     default: Horror
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The genre was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Genre updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     genre:
 *                       type: object
 *                       $ref: '#/components/schemas/Genre'
 *       409:
 *         description: The genre does not exist
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
 *                   default: Genre not found
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
  '/:genre_id',
  [check('name', 'The name is required').not().isEmpty(), validarCampos],
  authMiddleware,
  genreController.updateGenre
);

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre/{genre_id}:
 *   delete:
 *     summary: Desactivate the genre
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: genre_id
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The genre was desactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Genero desactivado
 *                 data:
 *                   type: object
 *                   properties:
 *                     genre:
 *                       type: object
 *                       $ref: '#/components/schemas/Genre'
 *       409:
 *         description: The genre does not exist
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
 *                   default: Genero no encontrado
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
router.delete('/:genre_id', authMiddleware, genreController.deleteGenre);

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre/activate/{genre_id}:
 *   put:
 *     summary: Activate the genre
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: genre_id
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The genre was activated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Genero activado
 *                 data:
 *                   type: object
 *                   properties:
 *                     genre:
 *                       type: object
 *                       $ref: '#/components/schemas/Genre'
 *       409:
 *         description: The genre does not exist
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
 *                   default: Genero no encontrado
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
  '/activate/:genre_id',
  authMiddleware,
  genreController.activateGenre
);

module.exports = router;

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
 *   get:
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
 *                   type: object
 *                   properties:
 *                     genres:
 *                       type: object
 *                       $ref: '#/components/schemas/Genre'
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
//router.get('/all', genreController.getAllGenres);

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
/*
router.post(
  '/',
  [check('name', 'The name is required').not().isEmpty(), validarCampos],
  authMiddleware,
  genreController.createGenre
);
*/

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre/{genreId}:
 *   put:
 *     summary: Update the genre
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: genreId
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

/*
router.put(
  '/:genreId',
  [check('name', 'The name is required').not().isEmpty(), validarCampos],
  authMiddleware,
  genreController.updateGenreById
);*/

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: The Genre managing API
 * /genre/{genreId}:
 *   delete:
 *     summary: Delete the genre
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: genreId
 *     security: [
 *       {
 *         bearerAuth: []
 *       }
 *     ]
 *     responses:
 *       200:
 *         description: The genre was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   default: Genre deleted
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
//router.delete('/:genreId', authMiddleware, genreController.deleteGenreById);

module.exports = router;

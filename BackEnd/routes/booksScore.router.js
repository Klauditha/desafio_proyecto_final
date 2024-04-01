const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.handler.js');
const { validarCampos } = require('../middlewares/validation.handler.js');
const { check } = require('express-validator');
const { ratingController } = require('../controllers');

router.get('/:rating_id', ratingController.getBookScoreByIdBook);

router.put(
  '/activate/:rating_id',
  authMiddleware,
  ratingController.updateByScoreBook // replace with your actual update function
);

module.exports = router;
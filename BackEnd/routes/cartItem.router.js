const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.handler');
const { cartController } = require('../controllers');
const { validarCampos } = require('../middlewares/validation.handler');
const { check } = require('express-validator');

router.get('/:user_id', authMiddleware, cartController.getCartItemsByUser);

router.put(
  '/:cart_item_id',
  [
    check('user_id', 'The user is required').not().isEmpty(),
    check('book_id', 'The book is required').not().isEmpty(),
    check('quantity', 'The quantity is required').not().isEmpty(),
    check('deleted', 'The price is required').not().isEmpty(),
    validarCampos,
  ],
  authMiddleware,
  cartController.updateCartItem
);

module.exports = router;

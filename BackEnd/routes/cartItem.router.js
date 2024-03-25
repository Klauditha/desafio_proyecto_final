const express = require('express');
const router = express.Router();
const {
  AuthMiddleware,
  authMiddleware,
} = require('../middlewares/auth.handler');
const { cartController } = require('../controllers');
const { validarCampos } = require('../middlewares/validation.handler');
const { check } = require('express-validator');

//router.get('/:cart_item_id', authMiddleware, cartController.getCartItem);
router.get('/:user_id', authMiddleware, cartController.getCartItemsByUser);

router.put('/:cart_item_id', authMiddleware, cartController.updateCartItem);
router.delete('/:cart_item_id', authMiddleware, cartController.deleteCartItem);

module.exports = router;

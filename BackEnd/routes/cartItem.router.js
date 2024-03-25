const express = require('express');
const router = express.Router();
const { AuthMiddleware, authMiddleware } = require('../middlewares/auth.handler');
const { CartItemController } = require('../controllers');
const { validarCampos } = require('../middlewares/validation.handler');
const { check } = require('express-validator');

router.get('/:cart_item_id', authMiddleware, CartItemController.getCartItem);
router.get('/:cart_id', authMiddleware, CartItemController.getCartItems);
router.put('/:cart_item_id', authMiddleware, CartItemController.updateCartItem);
router.delete('/:cart_item_id', authMiddleware, CartItemController.deleteCartItem);

module.exports = router;
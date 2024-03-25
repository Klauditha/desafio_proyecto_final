const boom = require('@hapi/boom');
const CartItemService = require('../services/cartItem.service');

const service = new CartItemService();

// crear un item del carro

const createCartItem = async (req, res, next) => {
  try {
    const data = req.body;
    const newCartItem = await service.createCartItem(data);
    res.status(201).json({
      status: true,
      message: 'Cart item created',
      data: {
        newCartItem,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// obtener un cart item por la id
const getCartItem = async (req, res, next) => {
  try {
    const { cart_item_id } = req.params;
    const cartItem = await service.getCartItem(cart_item_id);
    res.status(200).json({
      status: true,
      message: 'Cart item found',
      data: {
        cartItem,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// obtener todos los cart items por usuario
const getCartItemsByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const cart = await service.getCartItemsByUser(user_id);
    res.status(200).json({
      status: true,
      message: 'Cart items found',
      data: {
        cart,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// actualizar un cart item
const updateCartItem = async (req, res, next) => {
  try {
    const { cart_item_id } = req.params;
    const body = req.body;
    const cartItem = await service.updateCartItem(body, cart_item_id);
    res.status(200).json({
      status: true,
      message: 'Cart item updated',
      data: {
        cartItem,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// borrar un cart item
const deleteCartItem = async (req, res, next) => {
  try {
    const { cart_item_id } = req.params;
    const cartItem = await service.deleteCartItem(cart_item_id);
    res.status(200).json({
      status: true,
      message: 'Cart item deleted',
      data: {
        cartItem,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  createCartItem,
  getCartItem,
  getCartItemsByUser,
  updateCartItem,
  deleteCartItem,
};

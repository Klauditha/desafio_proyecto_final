const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class CartItemService {
  constructor() {}

  async createCartItem(data) {
    const newCartItem = await models.CartItem.create(data);
    return newCartItem;
  }

  async findOneCartItem(id) {
    const cartItem = await models.CartItem.findByPk(id);
    if (!cartItem) {
      throw boom.notFound('Cart item not found');
    }
    return cartItem;
  }

  async getCartItemsByUser(user_id) {
    const cartItems = await models.Cart.findAll({
      where: {
        user_id : user_id,
        deleted: false,
      },
    });
    if (!cartItems) {
      throw boom.notFound('Cart items not found');
    }
    return cartItems;
  }
}

module.exports = CartItemService;

const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class CartItemService {
  constructor() {}
  
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

  async create(data) {
    const newCartItem = await models.Cart.create(data);
    return newCartItem;
  }

  async update(cart_item_id, changes) {
    const cart = await models.Cart.findByPk(cart_item_id);
    if (!cart) {
      throw boom.notFound('Cart not found');
    }
    const rta = await cart.update(changes);
    return rta;
  }
}

module.exports = CartItemService;

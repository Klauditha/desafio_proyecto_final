const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class CartItemService {
  constructor() {}

  async getCartItemsByUser(user_id) {
    const cartItems = await models.Cart.findAll({
      where: {
        user_id: user_id,
        deleted: false,
      },
    });
    if (!cartItems) {
      throw boom.notFound('Libros del carrito no encontrados.');
    }
    return cartItems;
  }

  async create(data) {
    data = { ...data, deleted: false };
    const existingCart = await models.Cart.findOne({
      where: { user_id: data.user_id, book_id: data.book_id },
    });
    if (existingCart) {
      const updatedCart = await existingCart.update({
        quantity: parseInt(data.quantity, 10),
        deleted: false,
      });
      const book = await models.Book.findByPk(data.book_id);
      return { cartItem: updatedCart, book };
    }

    const updatedCart = await models.Cart.create({
      user_id: data.user_id,
      book_id: data.book_id,
      quantity: data.quantity,
      deleted: false,
    });
    const book = await models.Book.findByPk(data.book_id);
    return { cartItem: updatedCart, book };
  }

  async update(cart_item_id, changes) {
    const cart = await models.Cart.findByPk(cart_item_id);
    if (!cart) {
      throw boom.notFound('Carrito no encontrado');
    }
    const rta = await cart.update(changes);
    return rta;
  }

  async deleteCartByUser(user_id) {
    const cart = await models.Cart.destroy({
      where: {
        user_id: user_id,
      },
    });
    if (!cart) {
      throw boom.notFound('Carrito no encontrado');
    }
    return cart;
  }
}

module.exports = CartItemService;

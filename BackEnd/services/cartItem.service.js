const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

const CartItemService = {
    constructor() {},

    async createCartItem(data)  {
        
        const newCartItem = await models.CartItem.create(data);
        return newCartItem;
    },

    async findOneCartItem(id) {
        const cartItem = await models.CartItem.findByPk(id);
        if (!cartItem) {
            throw boom.notFound('Cart item not found');
        }
        return cartItem;
    }
}

module.exports = CartItemService
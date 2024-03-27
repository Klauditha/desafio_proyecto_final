const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class OrdersService {
    constructor() {}

    async create(data) {
        const order = await models.Order.create(data);
        return order;
    }   

    async find() {
        const orders = await models.Order.findAll();
        return orders;
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id);
        if (!order) {
            throw boom.notFound('Order not found');
        }
        return order;
    }

    async update(id, changes) {
        const order = await this.findOne(id);
        const rta = await order.update(changes);
        return rta;
    }

    async delete(id) {
        const order = await this.findOne(id);
        const rta = await order.destroy();
        return rta;
    }

    async getAllByUser(user_id) {
        const orders = await models.Order.findAll({ where: { user_id } });
        return orders;
    }
}

module.exports = OrdersService;
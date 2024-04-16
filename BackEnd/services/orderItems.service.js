const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');
const { pool } = require('../config/db');

class OrderItemsService {
  constructor() {}

  async create(data) {
    const newOrderItem = await models.OrderItem.create(data);
    return newOrderItem;
  }

  async update(id, changes) {
    const orderItem = await this.findOne(id);
    const rta = await orderItem.update(changes);
    return rta;
  }

  async delete(id) {
    const orderItem = await this.findOne(id);
    const rta = await orderItem.destroy();
    return rta;
  }

  async findOne(id) {
    const orderItem = await models.OrderItem.findByPk(id);
    if (!orderItem) {
      throw boom.notFound('OrderItem not found');
    }
    return orderItem;
  }

  async find() {
    const orderItems = await models.OrderItem.findAll();
    return orderItems;
  }

  async addBook(order_id, book_id) {
    const newOrderItem = await models.OrderItem.create({
      order_id,
      book_id,
    });
    return newOrderItem;
  }

  async deleteBook(order_id, book_id) {
    const orderItem = await models.OrderItem.findOne({
      where: {
        order_id,
        book_id,
      },
    });
    if (!orderItem) {
      throw boom.notFound('OrderItem not found');
    }
    const rta = await orderItem.destroy();
    return rta;
  }

  async getAllByOrder(order_id) {
    try {
      let orderItems = [];
      const client = await pool.connect();
      const query = `SELECT OI.order_item_id, OI.quantity, B.title, B.price, B.img FROM order_items OI 
      JOIN books B ON OI.book_id = B.book_id
      WHERE OI.order_id = ${order_id}`;

      const result = await client.query(query);
      orderItems = result.rows;
      
      return orderItems;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = OrderItemsService;

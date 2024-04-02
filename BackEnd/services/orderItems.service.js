const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');

class OrderItemsService {
  constructor() {}

  async create(data) {
    const newOrderItem = await models.OrderItems.create(data);
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
    const orderItem = await models.OrderItems.findByPk(id);
    if (!orderItem) {
      throw boom.notFound('OrderItem not found');
    }
    return orderItem;
  }

  async find() {
    const orderItems = await models.OrderItems.findAll();
    return orderItems;
  }

  async addBook(order_id, book_id) {
    const newOrderItem = await models.OrderItems.create({
      order_id,
      book_id,
    });
    return newOrderItem;
  }

  async deleteBook(order_id, book_id) {
    const orderItem = await models.OrderItems.findOne({
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


  /* Obtiene la suma de la cantidad de libros vendidos por cada libro */
  async getQuantitySoldByBook(book_id) {
    //console.log(book_id);
    let sum = 0;
    const orderItems = await models.OrderItem.findAll({
      where: {
        book_id: book_id,
        deleted: false,
      },
    });
    console.log(orderItems);
    orderItems.map((orderItem) => {
      sum = sum + parseInt(orderItem.quantity)
    });
    //console.log(sum);
    return sum;
  }
}

module.exports = OrderItemsService;

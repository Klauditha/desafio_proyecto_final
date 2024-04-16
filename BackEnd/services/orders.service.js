const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');
const { pool } = require('../config/db');

class OrdersService {
  constructor() {}

  async create(data) {
    const order = await models.Order.create(data);
    return order;
  }

  async find() {
    const orders = await models.Order.findAll({
      order: [['order_id', 'DESC']],
    });
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
    const orders = await models.Order.findAll(
      { where: { user_id } },
      { order: ['order_id', 'DESC'] }
    );
    return orders;
  }

  async createOrderByUser(user_id) {
    try {
      const client = await pool.connect();
      const query = `INSERT INTO public.orders( user_id, order_date, total_amount, deleted) SELECT user_id, NOW(), sum(quantity*B.price) as total_amount , 'false'
                FROM public.cart_items CI
                JOIN public.books B on CI.book_id = B.book_id 
                where user_id = ($1) and CI.deleted = false
                group by user_id RETURNING *`;
      const result = await client.query(query, [user_id]);
      const order_id = result.rows[0].order_id;

      const query2 = `INSERT INTO public.order_items(order_id, book_id, quantity, deleted) 
      SELECT ($2), book_id, quantity, deleted FROM public.cart_items 
          where user_id = ($1) and deleted = false RETURNING *`;

      const result2 = await client.query(query2, [user_id, order_id]);
      const registrosInOrder = result2.rows;

      return {
        orden: result.rows[0],
        detalleOrden: registrosInOrder,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = OrdersService;

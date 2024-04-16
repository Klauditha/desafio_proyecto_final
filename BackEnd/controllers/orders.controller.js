const boom = require('@hapi/boom');
const OrderService = require('../services/orders.service');
const OrderItemsService = require('../services/orderItems.service');

const service = new OrderService();
const orderItemsService = new OrderItemsService();

const getAllByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      throw boom.badRequest('Parametro user_id es invalido o no se provee');
    }
    const orders = await service.getAllByUser(user_id);
    res.status(200).json({
      status: true,
      message: 'Ordenes encontradas',
      data: {
        orders,
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

const createOrderByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      throw boom.badRequest('Parametro user_id es invalido o no se provee');
    }
    const orden = await service.createOrderByUser(user_id);
    res.status(200).json({
      status: true,
      message: 'Orden creada',
      data: {
        orden: orden.orden,
        detalleOrden: orden.detalleOrden,
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    //console.log(error);
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const getDetailOrder = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    if (!order_id) {
      throw boom.badRequest('Parametro order_id es invalido o no se provee');
    }
    const detailOrder = await orderItemsService.getAllByOrder(order_id);
    res.status(200).json({
      status: true,
      message: 'Detalle orden encontrado',
      data: {
        detailOrder,
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
  getAllByUser,
  createOrderByUser,
  getDetailOrder,
};

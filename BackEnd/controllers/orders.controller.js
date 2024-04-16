const boom = require('@hapi/boom');
const OrderService = require('../services/orders.service');

const service = new OrderService();

const getAllByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      throw boom.badRequest('Parametro user_id es invalido o no se provee');
    }
    const orders = await service.getAllByUser(user_id);
    res.status(200).json({
      status: true,
      message: 'Orders found',
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
  console.log('createOrderByUser', req.user);
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
        detalleOrden: orden.detalleOrden
      },
    });
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    console.log(error);
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getAllByUser,
  createOrderByUser
}
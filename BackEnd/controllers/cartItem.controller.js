const boom = require('@hapi/boom');
const CartItemService = require('../services/cartItem.service');
const UserService = require('../services/user.service');
const BookService = require('../services/book.service');

const service = new CartItemService();
const userService = new UserService();
const bookService = new BookService();

// obtener todos los cart items por usuario
const getCartItemsByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await userService.findById(user_id);
    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    const cart = await service.getCartItemsByUser(user_id);
    res.status(200).json({
      status: true,
      message: 'Items del carrito encontrados',
      data: {
        cart,
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

// actualizar un cart item, considera agregar, editar y eliminar
const updateCartItem = async (req, res, next) => {
  try {
    const cart_item_id = parseInt(req.params.cart_item_id, 10);
    const body = req.body;
    const user = await userService.findById(body.user_id);
    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    const book = await bookService.findOne(body.book_id);
    if (!book) {
      throw boom.notFound('Libro no encontrado');
    }
    if (body.quantity === 0 || body.deleted) {
      body.deleted = true;
      const cartItem = await service.update(cart_item_id, body);
      res.status(200).json({
        status: true,
        message: 'Item del carrito borrado',
        data: {
          cartItem,
        },
      });
    } else {
      const cartItem = await service.update(cart_item_id, body);
      res.status(200).json({
        status: true,
        message: 'Item del carrito actualizado',
        data: {
          cartItem,
        },
      });
    }
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    req.body.deleted = true;
    await updateCartItem(req, res, next);
  } catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};
const deleteCartByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await userService.findById(user_id);
    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    const cart = await service.deleteCartByUser(user_id);
    res.status(200).json({
      status: true,
      message: 'Items del carrito eliminados',
      data: {
        cart,
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

const createCartItem = async (req, res, next) => {
  const { user_id, book_id, quantity } = req.body;
  const quantityInt = parseInt(quantity, 10);

  const user = await userService.findById(user_id);
  if (!user) {
    throw boom.notFound('Usuario no encontrado');
  }

  const book = await bookService.findOne(book_id);
  if (!book) {
    throw boom.notFound('Libro no encontrado');
  }

  const cart = await service.create({
    user_id,
    book_id,
    quantity: quantityInt,
  });

  res.status(201).json({
    status: true,
    message: 'Item de carrito creado',
    data: {
      cart: cart,
      book: book,
    },
  });
};

module.exports = {
  getCartItemsByUser,
  updateCartItem,
  createCartItem,
  deleteCartItem,
  deleteCartByUser,
};

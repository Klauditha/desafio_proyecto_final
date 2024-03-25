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
      throw boom.notFound('User not found');
    }
    const cart = await service.getCartItemsByUser(user_id);
    res.status(200).json({
      status: true,
      message: 'Cart items found',
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
    const { cart_item_id } = req.params;
    const body = req.body;
    const user = await userService.findById(body.user_id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const book = await bookService.findOne(body.book_id);
    if (!book) {
      throw boom.notFound('Book not found');
    }
    const cartItem = await service.update(cart_item_id, body);
    res.status(200).json({
      status: true,
      message: 'Cart item updated',
      data: {
        cartItem,
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
  const body = req.body;
  console.log(body);

  const { user_id, book_id } = body;
  const user = await userService.findById(user_id);
  if (!user) {
    throw boom.notFound('User not found');
  }
  const book = await service.findOne(book_id);
  if (!book) {
    throw boom.notFound('Book not found');
  }

  const cart = await service.create(data);
  res.status(201).json({
    status: true,
    message: 'Cart item created',
    data: {
      cart,
    },
  });
};

module.exports = {
  getCartItemsByUser,
  updateCartItem,
  createCartItem,
};

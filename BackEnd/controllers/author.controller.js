const boom = require('@hapi/boom');
const AuthorService = require('../services/author.service');
const service = new AuthorService();

/** Crear un nuevo autor */
const createAuthor = async (req, res, next) => {
  try {
    const body = req.body;
    const newAuthor = await service.create(body);
    res.status(200).json({
      status: true,
      message: 'New author created',
      data: {
        author: newAuthor,
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

/**Obtener un autor por su id */
const getAuthor = async (req, res, next) => {
  try {
    const { author_id } = req.params;
    const author = await service.findOne(author_id);
    res.status(200).json({
      status: true,
      message: 'Author found',
      data: {
        author,
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

/** Actualizar un autor por su id */
const updateAuthor = async(req, res, next) => {
  try {
    const body = req.body;
    const { author_id } = req.params;
    const author = await service.update(body, author_id);
    res.status(200).json({
      status: true,
      message: 'Author updated',
      data: {
        author,
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

const deleteAuthor = async (req, res, next) => {
  try {
    const { author_id } = req.params;
    const author = await service.delete(author_id);
    res.status(200).json({
      status: true,
      message: 'Author deleted',
      data: {
        author,
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

const activateAuthor = async (req, res, next) => {
  try {
    const { author_id } = req.params;
    const author = await service.activate(author_id);
    res.status(200).json({
      status: true,
      message: 'Author activated',
      data: {
        author,
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

/**Obtener todos los autores */
const getAuthors = async (req, res, next) => {
  try {
    const authors = await service.findAll();
    res.status(200).json({
      status: true,
      message: 'Authors found',
      data: {
        authors,
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

const getAuthorsActive = async (req, res, next) => {
  try {
    const authors = await service.getAuthorsActive();
    res.status(200).json({
      status: true,
      message: 'Authors found',
      data: {
        authors,
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
  createAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthors,
  getAuthorsActive,
  activateAuthor,
};

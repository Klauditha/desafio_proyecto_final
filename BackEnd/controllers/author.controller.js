const boom = require('@hapi/boom');
const AuthorService = require('../services/author.service');

const service = new AuthorService();

const createAuthor = (req, res, next) => {
  try {
    const body = req.body;
    const newAuthor = service.create(body);
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

const getAuthor = (req, res, next) => {
  try {
    res.status(200).send('Autor obtenido');
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateAuthorById = (req, res, next) => {
  try {
    res.status(200).send('Autor actualizado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteAuthorById = (req, res, next) => {
  try {
    res.status(200).send('Autor eliminado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAuthors = (req, res, next) => {
  try {
    const authors = service.findAll();
    res.status(200).json({
      status: true,
      message: 'Authors found',
      data: {
        authors,
      }
    });
  }
  catch (error) {
    let codeError = error.isBoom ? error.output.statusCode : 500;
    res.status(codeError).json({
      status: false,
      message: error.message,
      data: null,
    })
  }
}

module.exports = {
    createAuthor,
    getAuthor,
    updateAuthorById,
    deleteAuthorById,
    getAuthors
};

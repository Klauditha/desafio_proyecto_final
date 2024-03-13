const boom = require('@hapi/boom');
const GenreService = require('../services/genre.service');

const service = new GenreService();

const createGenre = (req, res, next) => {
  try {
    const body = req.body;
    const newGenre = service.create(body);
    res.status(200).json({
      status: true,
      message: 'New genre created',
      data: {
        author: newGenre,
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

const getGenre = (req, res, next) => {
  try {
    res.status(200).send('Genero obtenido');
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateGenreById = (req, res, next) => {
  try {
    res.status(200).send('Genero actualizado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteGenreById = (req, res, next) => {
  try {
    res.status(200).send('Genero eliminado');
  } catch (error) {
    res.status(500).send(error);
  }
};

const getGenres = (req, res, next) => {
  try {
    const genres = service.findAll();
    res.status(200).json({
      status: true,
      message: 'Genres found',
      data: {
        genres,
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
    createGenre,
    getGenre,
    updateGenreById,
    deleteGenreById,
    getGenres
};

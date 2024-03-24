const boom = require('@hapi/boom');
const GenreService = require('../services/genre.service');

const service = new GenreService();

/* Crear un genero */
const createGenre = async (req, res, next) => {
  try {
    const data = req.body;
    const genre = await service.create(data);
    res.status(201).json({
      status: true,
      message: 'Genre created',
      data: {
        genre,
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

/* Obtener un genero por su id */
const getGenre = async (req, res, next) => {
  try {
    const { genre_id } = req.params;
    const genre = await service.findOne(genre_id);
    res.status(200).json({
      status: true,
      message: 'Genre found',
      data: {
        genre,
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

/* Obtener todos los generos */
const getGenres = async (req, res, next) => {
  try {
    const genres = await service.findAll();
    res.status(200).json({
      status: true,
      message: 'Genres found',
      data: {
        genres,
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

/* Obtener todos los generos activos */
const getGenresActive = async (req, res, next) => {
  try {
    const genres = await service.getGenresActive();
    res.status(200).json({
      status: true,
      message: 'Genres found',
      data: {
        genres,
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

const getGenreByIdBook = async (req, res, next) => {
  try {
    const { book_id } = req.params;
    const genre = service.getGenreByIdBook(book_id);
    res.status(200).json({
      status: true,
      message: 'Genre found',
      data: {
        genre,
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

/* Actualizar un genero */
const updateGenre = async (req, res, next) => {
  try {
    const { genre_id } = req.params;
    const body = req.body;
    const genre = await service.update(body, genre_id);
    res.status(200).json({
      status: true,
      message: 'Genre updated',
      data: {
        genre,
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

const deleteGenre = async (req, res, next) => {
  try {
    const { genre_id } = req.params;
    const genre = await service.delete(genre_id);
    res.status(200).json({
      status: true,
      message: 'Genre deleted',
      data: {
        genre,
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

/* Activar un genero */
const activateGenre = async (req, res, next) => {
  try {
    const { genre_id } = req.params;
    const genre = await service.activate(genre_id);
    res.status(200).json({
      status: true,
      message: 'Genre activated',
      data: {
        genre,
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
  createGenre,
  getGenre,
  updateGenre,
  deleteGenre,
  getGenres,
  getGenresActive,
  getGenreByIdBook,
  activateGenre,
};

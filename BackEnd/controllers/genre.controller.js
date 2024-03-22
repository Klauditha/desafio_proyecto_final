const boom = require('@hapi/boom');
const GenreService = require('../services/genre.service');

const service = new GenreService();

const createGenre = (req, res, next) => {
  
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
  })
 } catch (error) {
  let codeError = error.isBoom ? error.output.statusCode : 500;
  res.status(codeError).json({
    status: false,
    message: error.message,
    data: null,
  })
 }
};

const getGenreByIdBook = (req, res, next) => {
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
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    })
  }
}
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

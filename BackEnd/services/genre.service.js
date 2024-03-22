const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');

class GenreService {
  constructor() {}

  async create(data) {}

  async findOne(id_genre) {
    const genre = await models.Genre.findByPk(id_genre);
    if (!genre) {
      throw boom.notFound('Genre not found');
    }
    return genre;
  }

  async findOneByIdBook(id_book) {
    const genrebook = await models.BookGenre.findOne({
      book_id: id_book,
    });
    if (!genrebook) {
      throw boom.notFound('Genre not found');
    }
    return genrebook;
  }

  async findAllByIdBooks(id_book) {
    const genresbook = await models.BookGenre.findAll({
      book_id: id_book,
    });

    if (!genresbook) {
      throw boom.notFound('Genre not found');
    }

    return genresbook;
  }
}

module.exports = GenreService;

const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');

class GenreService {
  constructor() {}

  async create(data) {
    const { name } = data;
    data = { ...data, deleted: false };
    const genre = await models.Genre.findOne({ where: { name } });
    if (genre) {
      throw boom.conflict('Genre already exists');
    }
    const newGenre = await models.Genre.create(data);
    return newGenre;
  }

  async createByName(genre) {
    const newGenre = await models.Genre.create({ name: genre, deleted: false });
    return newGenre;
  }

  async findOne(id_genre) {
    const genre = await models.Genre.findByPk(id_genre);
    return genre;
  }

  async findOneByName(name) {
    const genre = await models.Genre.findOne({ where: { name: name } });
    if (!genre) {
      return null;
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

  async findAll() {
    const genres = await models.Genre.findAll();
    return genres;
  }

  async getGenresActive() {
    const genres = await models.Genre.findAll({
      where: {
        deleted: false,
      },
    });
    return genres;
  }

  async update(changes, id_genre) {
    const genre = await models.Genre.findByPk(id_genre);
    if (!genre) {
      throw boom.notFound('Genre not found');
    }
    const { name } = changes;
    if (name) {
      const genreExists = await models.Genre.findOne({ where: { name } });
      if (genreExists) {
        throw boom.conflict('Genre already exists');
      }
    }
    const rta = await genre.update(changes);
    return rta;
  }

  async delete(id_genre) {
    const genre = await this.findOne(id_genre);
    if (!genre) {
      throw boom.notFound('Genre not found');
    }
    const rta = await genre.update({ deleted: true });
    return rta;
  }

  async activate(id_genre) {
    const genre = await models.Genre.findByPk(id_genre);
    if (!genre) {
      throw boom.notFound('Genre not found');
    }
    const rta = await genre.update({ deleted: false });
    return rta;
  }

  async updateDeleted(id_genre) {
    const genre = await this.findOne(id_genre);
    if (!genre) {
      return null;
    }
    const rta = await genre.update({ deleted: true });
    return rta;
  }
}

module.exports = GenreService;

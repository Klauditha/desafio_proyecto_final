const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');
const { pool } = require('../config/db');

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
    try {
      let genres = [];
      const client = await pool.connect();
      const query =
        'SELECT G.genre_id, G.name, G.deleted, CAST(COUNT(BG.book_id) as integer) quantityBook FROM genres G LEFT JOIN books_genres BG ON G.genre_id = BG.genre_id GROUP BY G.genre_id, G.name, G.deleted ORDER BY G.name;';
      const result = await client.query(query);
      genres = result.rows;
      return genres;
    } catch (error) {
      return null;
    }
  }

  async getGenresActive() {
    const genres = await models.Genre.findAll({
      where: {
        deleted: false,
      },
      order: [['name', 'ASC']],
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
      throw boom.notFound('Genero no encontrado');
    }
    const rta = await genre.update({ deleted: true });
    return rta;
  }

  async activate(id_genre) {
    const genre = await models.Genre.findByPk(id_genre);
    if (!genre) {
      throw boom.notFound('Genero no encontrado');
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

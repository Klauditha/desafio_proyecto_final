const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');
const { pool } = require('../config/db');

class AuthorService {
  constructor() {}

  async create(data) {
    data = { ...data, deleted: false };
    const { name } = data;
    const author = await models.Author.findOne({ where: { name } });
    if (author) {
      throw boom.conflict('Autor ya existe');
    }
    const newAuthor = await models.Author.create(data);
    return newAuthor;
  }

  async findOne(id_author) {
    const author = await models.Author.findByPk(id_author);
    if (!author) {
      throw boom.notFound('Autor no encontrado');
    }
    return author;
  }

  async findOneByName(name) {
    const author = await models.Author.findOne({ where: { name } });
    if (!author) {
      return null;
    }
    return author;
  }

  async findAll() {
    try {
      let authors = [];
      const client = await pool.connect();
      const query =
        'SELECT A.author_id, A.name, A.deleted, CAST(COUNT(BA.book_id) as integer) quantityBook FROM authors A LEFT JOIN books_authors BA ON A.author_id = BA.author_id GROUP BY A.author_id, A.name, A.deleted ORDER BY A.name;';
      const result = await client.query(query);
      authors = result.rows;
      return authors;
    } catch (error) {
      return null;
    }
  }

  async getAuthorsActive() {
    const authors = await models.Author.findAll({
      where: {
        deleted: false,
      },
    });
    return authors;
  }

  async update(changes, id_author) {
    const author = await models.Author.findByPk(id_author);
    if (!author) {
      throw boom.notFound('Author not found');
    }
    const { name } = changes;
    if (name) {
      const authorExists = await models.Author.findOne({ where: { name } });
      if (authorExists) {
        throw boom.conflict('Author already exists');
      }
    }
    const rta = await author.update(changes);
    return rta;
  }

  async delete(id_author) {
    const author = await this.findOne(id_author);
    if (!author) {
      throw boom.notFound('Auor no encontrado');
    }
    const rta = await author.update({ deleted: true });
    return rta;
  }

  async activate(id_author) {
    const author = await models.Author.findByPk(id_author);
    if (!author) {
      throw boom.notFound('Autor no encontrado');
    }
    const rta = await author.update({ deleted: false });
    return rta;
  }
}

module.exports = AuthorService;

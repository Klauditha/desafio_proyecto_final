const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');

class AuthorService {
  constructor() {}

  async create(data) {
    data = { ...data, deleted: false };
    const { name } = data;
    const author = await models.Author.findOne({ where: { name } });
    if (author) {
      throw boom.conflict('Author already exists');
    }
    const newAuthor = await models.Author.create(data);
    return newAuthor;
  }

  async findOne(id_author) {
    const author = await models.Author.findByPk(id_author);
    if (!author) {
      throw boom.notFound('Author not found');
    }
    return author;
  }

  async findAll() {
    const authors = await models.Author.findAll();
    return authors;
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
      throw boom.notFound('Author not found');
    }
    const rta = await author.update({ deleted: true });
    return rta;
  }

  async activate(id_author) {
    const author = await models.Author.findByPk(id_author);
    if (!author) {
      throw boom.notFound('Author not found');
    }
    const rta = await author.update({ deleted: false });
    return rta;
  }
}

module.exports = AuthorService;

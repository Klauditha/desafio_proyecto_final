const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');

class AuthorService {
  constructor() {}

  async create(data) {
    const newAuthor = {
      authorId: faker.datatype.uuid(),
      ...data,
    };
    if (newAuthor.name === 'Claudia') {
      throw boom.conflict('Author already exists');
    }
    this.authors.push(newAuthor);
    return newAuthor;
  }

  async findOne(id_author) {
    const author = await models.Author.findByPk(id_author);
    if (!author) {
      throw boom.notFound('Author not found');
    }
    return author;
  }
}

module.exports = AuthorService;

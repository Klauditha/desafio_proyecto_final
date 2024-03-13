const { faker } = require('@faker-js/faker');
const { authorSchema } = require('../schemas/author.schema');
const boom = require('@hapi/boom');

class AuthorService {
  constructor() {
    this.authors = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      this.authors.push({
        authorId: faker.datatype.uuid(),
        name: faker.name.fullName(),
        state: faker.datatype.boolean(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    }
  }

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

  async findOne(id) {
    //const author = this.authors.find((author) => author.authorId === id);
    const author = this.authors[0];
    if (!author) {
      throw boom.notFound('Author not found');
    }      
    return author;
  }
}

module.exports = AuthorService;
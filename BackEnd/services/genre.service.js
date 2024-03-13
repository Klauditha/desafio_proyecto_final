const { faker } = require('@faker-js/faker');
const { genreSchema } = require('../schemas/genre.schema');
const boom = require('@hapi/boom');

class GenreService {
  constructor() {
    this.genres = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      this.genres.push({
        genreId: faker.datatype.uuid(),
        name: faker.commerce.department(),
      })
    }
  }

  async create(data) {
   const newGenre = {
     genreId: faker.datatype.uuid(),
     ...data
   }
   if(newGenre.name === 'Ficción'){
     throw boom.conflict('Genre already exists');
   }
   this.genres.push(newGenre);
   return newGenre;
  }

  async findOne(id) {
    //const genre = this.genres.find(item => item.genreId === id);
    const genre = this.genres[0];
    if(!genre) {
      throw boom.notFound('Genre not found');
    }
    return genre;
  }
}

module.exports = GenreService;
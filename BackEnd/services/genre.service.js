const { models } = require('../config/sequelize');
const boom = require('@hapi/boom');

class GenreService {
  constructor() {}

  async create(data) {}

  async findOne(id_genre) {
    console.log('finding genre...');
    const genre = await models.Genre.findByPk(id_genre);
    console.log(genre);
    if (!genre) {
      throw boom.notFound('Genre not found');
    }
    return genre;
  }

  async findOneByIdBook(id_book) {
    console.log('finding genre by book...');
    const genrebook = await models.BookGenre.findOne({
      book_id: id_book,
    });
    console.log(genrebook);
    if (!genrebook) {
      throw boom.notFound('Genre not found');
    }
    return genrebook;
  }

  async findAllByIdBooks(id_book) {
    console.log('finding genre by book...');
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

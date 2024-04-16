const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');
const { pool } = require('../config/db');

class BookGenreService {
  constructor() {}

  async create(data) {
    const newBookGenre = await models.BookGenre.create(data);
    return newBookGenre;
  }

  async findOneByBook(book_id) {
    const bookGenre = await models.BookGenre.findOne({
      where: {
        book_id,
      },
    })
    if (!bookGenre) {
      throw boom.notFound('BookGenre not found');
    }
    return bookGenre;
  }

  async updateDeletedByBook(book_id) {
    const bookGenre = await models.BookGenre.update(
      { deleted: true },
      { where: { book_id } }
    );
    return bookGenre;
  }

  async updateByGenreBook(genre_id, book_id) {
    console.log(genre_id, book_id);
    try {
      const client = await pool.connect();
      const query = `DELETE FROM books_genres WHERE book_id = ($1)`;
      const result = await client.query(query, [book_id]);
            
      const bookGenre = await models.BookGenre.create({
        genre_id,
        book_id
      })
      return bookGenre;
    } catch (error) {
      console.log(error);
    }
    
  }
}

module.exports = BookGenreService;

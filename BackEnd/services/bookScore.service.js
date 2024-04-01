const boom = require('@hapi/boom');
const { models } = require('../config/sequelize');

class BookScoreService {
    constructor() {}
  
    async create(data) {
      const newBookScore = await models.BookScore.create(data);
      return newBookScore;
    }
  
    async findOneByBook(book_id) {
      console.log(book_id);
      const bookScore = await models.BookScore.findOne({ where: { book_id } });
      if (!bookScore) {
        throw boom.notFound('BookScore not found');
      }
      return bookScore;
    }
  
    async updateDeletedByBook(book_id) {
      const bookScore = await models.BookScore.update(
        { deleted: true },
        { where: { book_id } }
      );
      return bookScore;
    }
  
    async updateByScoreBook(score, book_id) {
      const bookScore = await models.BookScore.update(
        { score },
        { where: { book_id } }
      );
      return bookScore;
    }
  }
  
  module.exports = BookScoreService;
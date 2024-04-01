const BookScoreService = require('../services/bookScore.service');
const { bookSchema } = require('../schemas/book.schema');
const boom = require('@hapi/boom');

const service = new BookScoreService();

const getBookScoreByIdBook = async (req, res) => {
    try {
        const { book_id } = req.params;
        const bookScore = await service.findOneByBook(book_id);
        res.status(200).json({
            status: true,
            message: 'BookScore found',
            data: {
                bookScore,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: null,
        })
    }
    
};

module.exports = {
    getBookScoreByIdBook,
};
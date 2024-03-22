const { Model, DataTypes, Sequelize } = require('sequelize');

const BOOK_AUTHOR_TABLE = 'books_authors';

const BookAuthorSchema = {
    book_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    author_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
};

class BookAuthor extends Model {
    static associate(models) {
        this.belongsTo(models.Book, { as: 'books' });
        this.belongsTo(models.Author, { as: 'authors' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: BOOK_AUTHOR_TABLE,
            modelName: 'BookAuthor',
            timestamps: false,
        };
    }
}

module.exports = { BOOK_AUTHOR_TABLE, BookAuthorSchema, BookAuthor }
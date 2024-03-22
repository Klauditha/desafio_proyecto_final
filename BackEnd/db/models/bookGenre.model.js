const { Model, DataTypes, Sequelize } = require('sequelize');

const BOOK_GENRE_TABLE = 'books_genres';

const BookGenreSchema = {
    bookgenre_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    book_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    genre_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
};

class BookGenre extends Model {
    static associate(models) {
        this.belongsTo(models.Book, { as: 'books' });
        this.belongsTo(models.Genre, { as: 'genres' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: BOOK_GENRE_TABLE,
            modelName: 'BookGenre',
            timestamps: false
        }
    }
}

module.exports = { BOOK_GENRE_TABLE, BookGenreSchema , BookGenre }
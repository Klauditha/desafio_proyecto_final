const { Model , DataTypes } = require('sequelize');

const BOOK_RATING_TABLE = 'ratings';

const BookRatingSchema = {
    bookrating_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    book_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    score: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    comment: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    whishlist: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
};

class BookRating extends Model {
    static associate(models) {
        this.belongsTo(models.Book, { as: 'books' });
        this.belongsTo(models.User, { as: 'users' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: BOOK_RATING_TABLE,
            modelName: 'BookRating',
            timestamps: false,
        };
    }
}

module.exports = { BOOK_RATING_TABLE, BookRatingSchema, BookRating }
const {Model, DataTypes, Sequelize} = require('sequelize');

const RATING_TABLE = 'ratings';

const RatingSchema = {
    rating_id: {
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
        validate: {
            min: 1,
            max: 5
        }
    },  
    comment: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    wishlist: {
        allowNull: false,
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
        defaultValue: false 
    }
};

class Rating extends Model {
    static associate(models) {
        this.belongsTo(models.Book, {as: 'book', foreignKey: 'book_id'});
        this.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'});
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: RATING_TABLE,
            modelName: 'Rating',
            timestamps: false
        }
    }
}

module.exports = {Rating, RatingSchema, RATING_TABLE}
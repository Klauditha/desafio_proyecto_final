const { Model, DataTypes, Sequelize } = require('sequelize');

const AUTHOR_TABLE = 'authors';

const AuthorSchema = {
    author_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
};

class Author extends Model {
    static associate(models) {
        this.hasMany(models.Book, {
            as: 'books_authors',
            foreignKey: 'author_id',
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: AUTHOR_TABLE,
            modelName: 'Author',
            timestamps: false,
        };
    }
}

module.exports = { Author, AUTHOR_TABLE, AuthorSchema }
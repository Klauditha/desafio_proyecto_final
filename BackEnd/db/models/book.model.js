const { Model, DataTypes, Sequelize } = require('sequelize');

const BOOK_TABLE = 'books';

const BookSchema = {
  book_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  isbn: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  img: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  language: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  pages: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  publisher: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  pub_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  deleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  }
};


class Book extends Model {
  static associate(models) {
    this.belongsToMany(models.Author, {
      through: 'books_authors',
      foreignKey: 'book_id',
      otherKey: 'author_id',
      timestamps: false
    });
    this.belongsToMany(models.Genre, {
      through: 'books_genres',
      foreignKey: 'book_id',
      otherKey: 'genre_id',
      timestamps: false
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOK_TABLE,
      modelName: 'Book',
      timestamps: false,
    };
  }
}

module.exports = { BOOK_TABLE, BookSchema, Book };

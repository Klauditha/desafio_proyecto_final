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
    Book.belongsToMany(models.Author, {
      through: models.BookAuthor,
      foreignKey: 'book_id',
      otherKey: 'author_id',
      as: 'authors',
    });
    Book.belongsToMany(models.Genre, {
      through: models.BookGenre,
      foreignKey: 'book_id',
      otherKey: 'genre_id',
      as: 'genres',
    });
   models.Book.belongsToMany(models.orderItems, {
      as: 'order_items',
      foreignKey: 'book_id',
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

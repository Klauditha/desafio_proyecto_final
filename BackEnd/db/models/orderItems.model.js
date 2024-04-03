const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_ITEM_TABLE = 'order_items';

const OrderItemSchema = {
  order_item_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  order_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'orders',
      key: 'order_id',
    },
  },
  book_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'books',
      key: 'book_id',
    },
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  deleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

class OrderItem extends Model {
  static associate(models) {
    this.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_id',
    });
    this.belongsTo(models.Book, {
      as: 'book',
      foreignKey: 'book_id',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_ITEM_TABLE,
      modelName: 'OrderItem',
      timestamps: false,
    };
  }
}

module.exports = { OrderItem, ORDER_ITEM_TABLE, OrderItemSchema };

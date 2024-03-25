const { Model, DataTypes, Sequelize } = require('sequelize');

const CART_ITEM_TABLE = 'cart_items';

const CartItemSchema = {
    cart_item_id: {
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
    quantity: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
}};

class CartItem extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: CART_ITEM_TABLE,
            modelName: 'Cart',
            timestamps: false,
        }; 
    }}

module.exports = {CartItem, CartItemSchema, CART_ITEM_TABLE}
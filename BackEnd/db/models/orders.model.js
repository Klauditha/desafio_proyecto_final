const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDERS_TABLE = 'orders';

const OrderSchema = {
    order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    order_date: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    total_amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
};

class Order extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDERS_TABLE,
            modelName: 'Order',
            timestamps: false,
        };
    }
}

module.exports = { ORDERS_TABLE, OrderSchema, Order }
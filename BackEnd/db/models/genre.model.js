const { Model, DataTypes, Sequelize } = require('sequelize');

const GENRE_TABLE = 'genres';

const GenreSchema = {
    genre_id: {
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

class Genre extends Model {
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: GENRE_TABLE,
            modelName: 'Genre',
            timestamps: false,
        }
    }
}
module.exports = { GENRE_TABLE, GenreSchema, Genre }
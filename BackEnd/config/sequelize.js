const { Sequelize } = require('sequelize');
const setupModels = require('../db/models/index');
require('dotenv').config();

const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const dbName = process.env.DB_DATABASE;

//const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${dbName}`;
const URI = `postgres://${USER}:${PASSWORD}@${HOST}/${dbName}`;

console.log(URI);


const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

setupModels(sequelize);
sequelize.sync();
module.exports = sequelize;
const { Sequelize } = require('sequelize');
const setupModels = require('../db/models/index');
require('dotenv').config();

const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const dbName = process.env.DB_DATABASE;

// DESCOMENTAR PARA LOCAL
//const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${dbName}`;

let URI;
let sequelize;
if (process.env.IS_RENDER == 'true') {
  URI = `postgres://${USER}:${PASSWORD}@${HOST}/${dbName}`;
  sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: false,
  
    //COMENTAR PARA LOCAL
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: true,
      },
    },
  });
}
else {
  URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${dbName}`;
  sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: false,
  
  });
}



console.log(URI);



setupModels(sequelize);
sequelize.sync();
module.exports = sequelize;

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//const pool = require('./config/db.js');

/**
 * Configuracion Swagger
 */
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Backend Ecommerce API - Book Store',
      version: '0.1.0',
      description:
        'Aqui encontraras todas las rutas de la API para el Backend.',
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        name: 'Authorization',
        in: 'header',
      },
    },
    Bearer: 'Authorization',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          description: 'JWT Authorization header using the Bearer scheme.',
          bearerFormat: 'JWT',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local API',
      },
      {
        url: 'https://desafio-proyecto-final-api.onrender.com/',
        description: 'Production API',
      },
    ],
  },
  apis: ['./routes/*.js'],
  paths: {},
};

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

//middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'hhttps://desafio-proyecto-final.onrender.com/',
      'https://checkout.stripe.com',
    ],
    credentials: true,
  })
);
app.use(express.json());

//routes
app.use('/', routes);

module.exports = app;

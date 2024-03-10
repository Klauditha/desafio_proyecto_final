const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Configuracion Swagger
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Backend Ecommerce API - Book Store',
      version: '0.1.0',
      description:
        'Aqui encontraras todas las rutas de la API para el Backend.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      /*
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Bad Request',
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              }
            }
          }
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error message',
            },
            status: {
              type: 'boolean',
              example: 'false',
            },
            data: {
              type: 'object',
              example: 'null',
            }
          }
        }
      },*/
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: 'http://localhost:3000',
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
app.use(cors());
app.use(express.json());

//routes
app.use('/', routes);

module.exports = app;

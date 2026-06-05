const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Take Home Test API Gateway',
      version: '1.0.0',
      description: 'Unified API documentation for all Take Home Test microservices',
    },
    servers: [
      { 
        url: 'http://localhost:8080', 
        description: 'Local development' 
      },
      { 
        url: 'https://api-gateway-production-a630.up.railway.app', 
        description: 'Production (Railway)' 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./server.js'], // Document routes in server.js
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };
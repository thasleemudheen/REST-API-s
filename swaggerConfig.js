const swaggerJsDoc=require('swagger-jsdoc')
const swaggerui=require('swagger-ui-express')


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'MOVIES LISTING API',
        version: '1.0.0',
        description: 'API documentation for the backend only application ',
      },
      servers: [
        {
          url: 'http://localhost:3004', 
        },
      ],
    },
    apis: ['./Routes/*.js'], 
  };

  const swaggerSpec=swaggerJsDoc(options)

  module.exports={swaggerui,swaggerSpec}
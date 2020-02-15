'use strict';

module.exports = {
  swaggerOptions: {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: 'Wallaclone API',
        description: 'Wallaclone API Information',
        contact: {
          name: 'github: eliasrosales88'
        },
        servers: ["http://localhost:3000"],
      }
    },
    apis: ['app.js']
  }
};
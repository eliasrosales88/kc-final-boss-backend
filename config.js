'use strict';

module.exports = {
  swaggerOptions: {
    swaggerDefinition: {
      info: {
        title: 'Wallaclone API',
        description: 'Wallaclone API Information',
        contact: {
          name: 'github: eliasrosales88'
        },
        servers: ["http://localhost:3000"]
      }
    },
    apis: ['app.js']
  }
};
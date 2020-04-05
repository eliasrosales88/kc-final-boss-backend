"use strict";

const register = require("./swagger/api.register");
const authenticate = require("./swagger/api.authenticate");
const adverts = require("./swagger/api.adverts");
const advert = require("./swagger/api.advert");
const userAdvert = require("./swagger/api.userAdvert");
const account = require("./swagger/api.account");
const accountAdvert = require("./swagger/api.accountAdvert");
const user = require("./swagger/api.user");
const accountUser = require("./swagger/api.accountUser");

module.exports = {
  swaggerOptions: { 
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Wallaclone API",
        version: "1.0.0",
        description: "Wallaclone API Information",
        contact: {
          name: "github: eliasrosales88"
        },
        servers: ["http://localhost:3000"]
      },
      produces: ["application/json"],
      host: "localhost:8000",
      basePath: "/api/swagger/v1",
      paths: {
        "/apiv1/register": {
          post: register.post
        },
        "/apiv1/authenticate": {
          post: authenticate.post
        },
        "/apiv1/adverts": {
          get: adverts.get
        },
        "/apiv1/advert": {
          get: advert.get
        },
        "/apiv1/userAdvert": {
          get: userAdvert.get
        },
        "/apiv1/account": {
          get: account.get
        },
        "/apiv1/account/advert": {
          get: accountAdvert.get,
          post: accountAdvert.post,
          patch: accountAdvert.patch,
          delete: accountAdvert.delete
        },
        "/apiv1/user": {
          get: user.get,
        },
        "/apiv1/account/user": {
          get: accountUser.get,
          patch: accountUser.patch,
          delete: accountUser.delete
        }
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: "header",
            bearerFormat: 'JWT',
            description: '<b>In the "Value" field goes the JWT provided when using register or authentication endpoints.</b>',
          }
        }
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    apis: ["app.js"],
  },
  adverts: {
    imagesURLBasePath: "/images/adverts/"
  }
};

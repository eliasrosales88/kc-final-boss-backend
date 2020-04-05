"use strict";

module.exports = {
  get: {
    tags: ["adverts"],
    description: "Get a list of Adverts by specific user",
    summary: "PUBLIC -- Get a list of Adverts by specific user",
    parameters: [
      {
        in: "query",
        name: "owner",
        schema: {
          type:"string"
        },
        required: true,
        description: "Username"
      },
      {
        in: "query",
        name: "limit",
        schema: {
          type:"integer"
        },
        description: "Amount of adverts by row"
      },

    ],
    responses: {
      "200": {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean"
                },
                result: {
                  type: "object",
                  properties:{ 
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type:"string"
                          },
                          name: {
                            type:"string"
                          },
                          description: {
                            type:"string"
                          },
                          price: {
                            type:"number"
                          },
                          photo: {
                            type:"string"
                          },
                          forSale: {
                            type:"string"
                          },
                          owner: {
                            type:"string"
                          },
                          createdAt: {
                            type:"string"
                          },
                          updatedAt: {
                            type:"string"
                          },
                          tags: {
                            type:"array",
                            items: {
                              type: "string"
                            }
                          }
                        }
                      }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

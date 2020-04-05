"use strict";

module.exports = {
  post: {
    tags: ["register"],
    description: "Register user",
    summary: "PUBLIC -- Register user",
    parameters: [],
    requestBody: {
      description: "A JSON object containing registration information",
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: {
                type: "string"
              },
              email: {
                type: "string"
              },
              password: {
                type: "string"
              }
            }
          },
          example: {
            username: "test111",
            email: "test@test.com",
            password: "e12345696"
          }
        }
      }
    },
    responses: {
      "200": {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean"
                },
                message: {
                  type: "string"
                },
                data: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string"
                    },
                    email: {
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
"use strict";

module.exports = {
  post: {
    tags: ["authenticate"],
    summary: "PUBLIC -- Login user",
    description: "Login user",
    parameters: [],
    requestBody: {
      description: "A JSON object containing user information",
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
            password: "e12345678",
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
                token: {
                  type: "string"
                }
              }
            }
          }
        }
      },
      "401": {
        description: "Unauthorized",
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
                }
              }
            }
          }
        }
      }
    }
  }
}
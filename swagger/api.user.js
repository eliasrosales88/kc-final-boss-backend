"use strict";

module.exports = {
  get: {
    tags: ["user"],
    description: "Get specific user",
    summary: "PUBLIC -- Get specific user",
    parameters: [
      {
        in: "query",
        name: "username",
        schema: {
          type: "string"
        },
        required: true,
        description: "username"
      }
    ],
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
                result: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string"
                    },
                    email: {
                      type: "string"
                    },
                    about: {
                      type: "string"
                    },
                    twitter: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "404": {
        description: "Not found",
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
};

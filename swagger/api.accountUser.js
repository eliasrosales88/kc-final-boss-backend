"use strict";

module.exports = {
  get: {
    tags: ["user"],
    description: "Get specific authenticated user",
    summary: "AUTHORIZATION REQUIRED -- Get specific authenticated user",
    parameters: [
      {
        in: "query",
        name: "username",
        schema: {
          type: "string",
        },
        required: true,
        description: "Username",
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
                success: {
                  type: "boolean",
                },
                result: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    about: {
                      type: "string",
                    },
                    twitter: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "404": {
        description: "Not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                },
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
  patch: {
    tags: ["user"],
    description: "Updates an authenticated user",
    summary: "AUTHORIZATION REQUIRED -- Updates an authenticated user",
    parameters: [],
    requestBody: {
      description: "A JSON  with user information",
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: {
                type: "string",
              },
              email: {
                type: "string",
              },
              about: {
                type: "string",
              },
              twitter: {
                type: "string",
              },
            },
          },
          example: {
            username: "test111",
            email: "test111@test.com",
            about: "About user",
            twitter: "tweetest111",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                },
                result: {
                  type: "object",
                  properties: {
                    about: {
                      type: "string",
                    },
                    twitter: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["user"],
    description: "Deletes an authenticated user",
    summary: "AUTHORIZATION REQUIRED -- Deletes an  authenticated user",
    parameters: [],
    requestBody: {
      description: "A JSON object containing the id of the user to delete",
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
            },
          },
          example: {
            username: "test115",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                },
                result: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                    },
                    username: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    __v: {
                      type: "number",
                    }
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

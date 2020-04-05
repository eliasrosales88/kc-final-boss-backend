"use strict";

module.exports = {
  get: {
    tags: ["adverts"],
    description: "Get one advert",
    summary: "PUBLIC -- Get one advert",
    parameters: [
      {
        in: "query",
        name: "_id",
        schema: {
          type: "string"
        },
        required: true,
        description: "Advert id"
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
                ok: {
                  type: "boolean"
                },
                result: {
                  type: "object",
                  properties: {
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string"
                        },
                        name: {
                          type: "string"
                        },
                        description: {
                          type: "string"
                        },
                        price: {
                          type: "number"
                        },
                        photo: {
                          type: "string"
                        },
                        forSale: {
                          type: "string"
                        },
                        owner: {
                          type: "string"
                        },
                        createdAt: {
                          type: "string"
                        },
                        updatedAt: {
                          type: "string"
                        },
                        tags: {
                          type: "array",
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
      },
      "404": {
        description: "Not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "object",
                  properties: {
                    stringValue: {
                      type: "string"
                    },
                    kind: {
                      type: "string"
                    },
                    value: {
                      type: "string"
                    },
                    path: {
                      type: "string"
                    },
                    reason: {
                      type: "object"
                    },
                    message: {
                      type: "string"
                    },
                    name: {
                      type: "string"
                    },
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

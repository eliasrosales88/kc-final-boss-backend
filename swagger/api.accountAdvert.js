"use strict";

module.exports = {
  get: {
    tags: ["adverts"],
    description: "Get advert list by specific user",
    summary: "AUTHORIZATION REQUIRED -- Get advert by specific authenticated user",
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
        name: "_id",
        schema: {
          type:"string"
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
  },
  post: {
    tags: ["adverts"],
    description: "Creates and advert",
    summary: "AUTHORIZATION REQUIRED -- Creates an advert by authenticated user",
    parameters: [],
    requestBody: {
      description: "A multipart/form-data  with advert information",
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              price: {
                type: "integer"
              },
              description: {
                type: "string"
              },
              forSale: {
                type: "boolean"
              },
              tags: {
                type: "string"
              },
              owner: {
                type: "string"
              },
              photo: {
                type: "string",
                format: "binary"
              }
            }
          },
          example: {
            name: "XBOX OneX",
            price: 333,
            description: "Awesome gaming console",
            forSale: true,
            tags: "my tag,other",
            createdAt: "2020-04-02T22:54:16.811Z",
            updatedAt: "2020-04-02T22:54:16.811Z",
            owner: "test111",
            photo: "(binary)",
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
      }
    }
  },
  patch: {
    tags: ["adverts"],
    description: "Updates and advert",
    summary: "AUTHORIZATION REQUIRED -- Updates an advert by authenticated user",
    parameters: [],
    requestBody: {
      description: "A multipart/form-data  with advert information",
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string"
              },
              name: {
                type: "string"
              },
              price: {
                type: "integer"
              },
              description: {
                type: "string"
              },
              forSale: {
                type: "boolean"
              },
              tags: {
                type: "string"
              },
              owner: {
                type: "string"
              },
              photo: {
                type: "string",
                format: "binary"
              }
            }
          },
          example: {
            name: "XBOX OneX",
            price: 333,
            description: "Awesome gaming console",
            forSale: true,
            tags: "my tag,other",
            createdAt: "2020-04-02T22:54:16.811Z",
            updatedAt: "2020-04-02T22:54:16.811Z",
            owner: "test111",
            photo: "(binary)",
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
      }
    }
  },
  delete: {
    tags: ["adverts"],
    description: "Deletes and advert",
    summary: "AUTHORIZATION REQUIRED -- Deletes an advert by authenticated user",
    parameters: [],
    requestBody: {
      description: "A JSON object containing id of the advert to delete",
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string"
              }
            }
          },
          example: {
            _id: "5e86754d7b57b17efafd3ee1"
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
      }
    }
  }
};

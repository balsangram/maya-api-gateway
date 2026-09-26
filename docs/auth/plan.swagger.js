const planSwagger = {
  "/api/plan/v1": {
    // ============================================
    // CREATE PLAN
    // ============================================
    post: {
      tags: ["Plans"],
      summary: "Create a subscription plan",
      description:
        "Creates a new subscription plan with a price, duration in days, and a list of features.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "name",
                "price",
                "durationDays",
                "features",
              ],

              properties: {
                name: {
                  type: "string",
                  example: "Starter",
                  description: "Name of the subscription plan",
                },

                price: {
                  type: "number",
                  example: 499,
                  description:
                    "Price of the subscription plan in INR",
                },

                durationDays: {
                  type: "integer",
                  example: 75,
                  description:
                    "Duration of the subscription plan in days",
                },

                features: {
                  type: "array",
                  description:
                    "List of features included in the plan",

                  items: {
                    type: "string",
                  },

                  example: [
                    "Unlimited posts",
                    "Unlimited messages",
                    "Priority support",
                    "No advertisements",
                    "Advanced analytics",
                  ],
                },
              },
            },

            example: {
              name: "Starter",
              price: 499,
              durationDays: 75,
              features: [
                "Unlimited posts",
                "Unlimited messages",
                "Priority support",
                "No advertisements",
                "Advanced analytics",
              ],
            },
          },
        },
      },

      responses: {
        201: {
          description: "Plan created successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Plan created successfully",
                data: {
                  name: "Starter",
                  price: 499,
                  durationDays: 75,
                  features: [
                    "Unlimited posts",
                    "Unlimited messages",
                    "Priority support",
                    "No advertisements",
                    "Advanced analytics",
                  ],
                  isActive: true,
                  _id: "6aa827eed4f34730035b143f",
                  createdAt: "2026-09-14T16:59:26.798Z",
                  updatedAt: "2026-09-14T16:59:26.798Z",
                  __v: 0,
                },
              },
            },
          },
        },

        400: {
          description: "Bad request",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Invalid plan data",
              },
            },
          },
        },

        401: {
          description: "Unauthorized",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Authentication required",
              },
            },
          },
        },

        403: {
          description: "Forbidden",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Admin access required",
              },
            },
          },
        },

        500: {
          description: "Internal server error",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Internal server error",
              },
            },
          },
        },
      },
    },

     // ============================================
    // GET ALL PLANS
    // ============================================
    get: {
      tags: ["Plans"],
      summary: "Get all subscription plans",
      description:
        "Retrieves all active subscription plans with pagination.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "page",
          in: "query",
          required: false,
          description: "Page number",
          schema: {
            type: "integer",
            minimum: 1,
            default: 1,
            example: 1,
          },
        },

        {
          name: "limit",
          in: "query",
          required: false,
          description: "Number of plans to return per page",
          schema: {
            type: "integer",
            minimum: 1,
            default: 10,
            example: 10,
          },
        },
      ],

      responses: {
        200: {
          description: "Plans retrieved successfully",

          content: {
            "application/json": {
              example: {
                success: true,
                message: "Plans retrieved successfully",

                data: [
                  {
                    _id: "6aa827eed4f34730035b143f",
                    name: "strar",
                    price: 499,
                    durationDays: 75,
                    features: [
                      "Unlimited posts",
                      "Unlimited messages",
                      "Priority support",
                      "No advertisements",
                      "Advanced analytics",
                    ],
                    isActive: true,
                    createdAt: "2026-09-14T16:59:26.798Z",
                    updatedAt: "2026-09-14T16:59:26.798Z",
                    __v: 0,
                  },
                  {
                    _id: "6aa1b39f14c0050dc7c221cf",
                    name: "strar",
                    price: 499,
                    durationDays: 75,
                    features: [
                      "Unlimited posts",
                      "Unlimited messages",
                      "Priority support",
                      "No advertisements",
                      "Advanced analytics",
                    ],
                    isActive: true,
                    createdAt: "2026-09-09T19:29:35.280Z",
                    updatedAt: "2026-09-09T19:29:35.280Z",
                    __v: 0,
                  },
                ],

                pagination: {
                  currentPage: 1,
                  limit: 10,
                  totalItems: 2,
                  totalPages: 1,
                  hasNextPage: false,
                  hasPreviousPage: false,
                },
              },
            },
          },
        },

        401: {
          description: "Unauthorized",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Authentication required",
              },
            },
          },
        },

        500: {
          description: "Internal server error",

          content: {
            "application/json": {
              example: {
                success: false,
                message: "Internal server error",
              },
            },
          },
        },
      },
    },

  },

  "/api/plan/v1/{planId}": {
  // ============================================
  // UPDATE PLAN
  // ============================================
  patch: {
    tags: ["Plans"],
    summary: "Update subscription plan",
    description:
      "Updates one or more fields of an existing subscription plan.",

    security: [
      {
        bearerAuth: [],
      },
    ],

    parameters: [
      {
        name: "planId",
        in: "path",
        required: true,
        description: "ID of the plan to update",
        schema: {
          type: "string",
          example: "6aa827eed4f34730035b143f",
        },
      },
    ],

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            properties: {
              name: {
                type: "string",
                example: "Prime Star",
                description: "Name of the subscription plan",
              },

              price: {
                type: "number",
                example: 499,
                description:
                  "Price of the subscription plan in INR",
              },

              durationDays: {
                type: "integer",
                example: 75,
                description:
                  "Duration of the subscription plan in days",
              },

              features: {
                type: "array",
                description:
                  "List of features included in the plan",

                items: {
                  type: "string",
                },

                example: [
                  "Unlimited posts",
                  "Unlimited messages",
                  "Priority support",
                  "No advertisements",
                  "Advanced analytics",
                ],
              },

              isActive: {
                type: "boolean",
                example: false,
                description:
                  "Whether the subscription plan is active",
              },
            },
          },

          example: {
            name: "Prime Star",
            isActive: false,
          },
        },
      },
    },

    responses: {
      200: {
        description: "Plan updated successfully",

        content: {
          "application/json": {
            example: {
              success: true,
              message: "Plan updated successfully",
              data: {
                _id: "6aa827eed4f34730035b143f",
                name: "Prime Star",
                price: 499,
                durationDays: 75,
                features: [
                  "Unlimited posts",
                  "Unlimited messages",
                  "Priority support",
                  "No advertisements",
                  "Advanced analytics",
                ],
                isActive: false,
                createdAt: "2026-09-14T16:59:26.798Z",
                updatedAt: "2026-09-14T17:43:48.447Z",
                __v: 0,
              },
            },
          },
        },
      },

      400: {
        description: "Invalid plan ID or update data",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Invalid plan ID",
            },
          },
        },
      },

      401: {
        description: "Unauthorized",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Authentication required",
            },
          },
        },
      },

      403: {
        description: "Forbidden",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Admin access required",
            },
          },
        },
      },

      404: {
        description: "Plan not found",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Plan not found",
            },
          },
        },
      },

      500: {
        description: "Internal server error",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Internal server error",
            },
          },
        },
      },
    },
  },

  // ============================================
  // DELETE PLAN
  // ============================================
  delete: {
    tags: ["Plans"],
    summary: "Delete subscription plan",
    description:
      "Deletes an existing subscription plan by its ID. Admin authentication is required.",

    security: [
      {
        bearerAuth: [],
      },
    ],

    parameters: [
      {
        name: "planId",
        in: "path",
        required: true,
        description: "ID of the plan to delete",
        schema: {
          type: "string",
          example: "6aa827eed4f34730035b143f",
        },
      },
    ],

    responses: {
      200: {
        description: "Plan deleted successfully",

        content: {
          "application/json": {
            example: {
              success: true,
              message: "Plan deleted successfully",
              data: {
                message: "Plan deleted successfully",
              },
            },
          },
        },
      },

      400: {
        description: "Invalid plan ID",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Invalid plan ID",
            },
          },
        },
      },

      401: {
        description: "Unauthorized",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Authentication required",
            },
          },
        },
      },

      403: {
        description: "Forbidden",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Admin access required",
            },
          },
        },
      },

      404: {
        description: "Plan not found",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Plan not found",
            },
          },
        },
      },

      500: {
        description: "Internal server error",

        content: {
          "application/json": {
            example: {
              success: false,
              message: "Internal server error",
            },
          },
        },
      },
    },
  },
},
};

export default planSwagger;
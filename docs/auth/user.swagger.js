const userSwagger = {
  "/api/user/v1/profile": {
    // =========================
    // GET PROFILE
    // =========================
    get: {
      tags: ["Users"],
      summary: "Get user profile",
      description:
        "Retrieves the profile of the currently authenticated user.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "User profile retrieved successfully",

          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },

                  message: {
                    type: "string",
                    example: "User profile retrieved successfully",
                  },

                  data: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "6a84a773851467a49aecf846",
                      },

                      name: {
                        type: "string",
                        example: "rrrr",
                      },

                      username: {
                        type: "string",
                        example: "education",
                      },

                      email: {
                        type: "string",
                        format: "email",
                        example: "balsangram04@gmail.com",
                      },

                      role: {
                        type: "string",
                        example: "User",
                      },

                      bio: {
                        type: "string",
                        example: "i am user",
                      },

                      profileImage: {
                        type: "string",
                        format: "uri",
                        example:
                          "https://res.cloudinary.com/dr3rcfbpm/image/upload/profile.jpg",
                      },

                      dateOfBirth: {
                        type: "string",
                        format: "date-time",
                        example: "2000-05-15T00:00:00.000Z",
                      },

                      gender: {
                        type: "string",
                        example: "male",
                      },

                      education: {
                        type: "string",
                        example: "btech",
                      },

                      profession: {
                        type: "string",
                        example: "dsfa",
                      },

                      hobbies: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        example: ["singer"],
                      },

                      languages: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        example: ["hindi"],
                      },

                      address: {
                        type: "string",
                        example: "sksk fjjf",
                      },

                      country: {
                        type: "string",
                        example: "india",
                      },

                      state: {
                        type: "string",
                        example: "",
                      },

                      district: {
                        type: "string",
                        example: "",
                      },

                      pin: {
                        type: "string",
                        example: "54545",
                      },

                      isProfilePublic: {
                        type: "boolean",
                        example: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },

        401: {
          description:
            "Unauthorized - access token is missing or invalid",
        },

        404: {
          description: "User profile not found",
        },

        500: {
          description: "Internal server error",
        },
      },
    },

    // =========================
    // PATCH PROFILE
    // =========================
    patch: {
      tags: ["Users"],
      summary: "Update user profile",
      description:
        "Updates the authenticated user's profile information and profile image.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,

        content: {
          "multipart/form-data": {
            schema: {
              type: "object",

              properties: {
                username: {
                  type: "string",
                  example: "education",
                },

                bio: {
                  type: "string",
                  example: "i am user",
                },

                profileImage: {
                  type: "string",
                  format: "binary",
                },

                dateOfBirth: {
                  type: "string",
                  format: "date",
                  example: "2000-05-15",
                },

                gender: {
                  type: "string",
                  example: "male",
                },

                education: {
                  type: "string",
                  example: "btech",
                },

                profession: {
                  type: "string",
                  example: "dsfa",
                },

                hobbies: {
                  type: "string",
                  example: "singer",
                },

                languages: {
                  type: "string",
                  example: "hindi",
                },

                address: {
                  type: "string",
                  example: "sksk fjjf",
                },

                country: {
                  type: "string",
                  example: "india",
                },

                pin: {
                  type: "string",
                  example: "54545",
                },

                name: {
                  type: "string",
                  example: "rrrr",
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Profile updated successfully",

          content: {
            "application/json": {
              schema: {
                type: "object",

                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },

                  message: {
                    type: "string",
                    example: "Profile updated successfully",
                  },

                  data: {
                    type: "object",
                    nullable: true,
                    example: null,
                  },
                },
              },
            },
          },
        },

        400: {
          description: "Invalid profile data",
        },

        401: {
          description:
            "Unauthorized - access token is missing or invalid",
        },

        404: {
          description: "User not found",
        },

        500: {
          description: "Internal server error",
        },
      },
    },

   // DELETE
  delete: {
    tags: ["Users"],
    summary: "Delete user profile",
    description: "Deletes the currently authenticated user's account.",

    security: [
      {
        bearerAuth: [],
      },
    ],

    responses: {
      200: {
        description: "User deleted successfully",

        content: {
          "application/json": {
            schema: {
              type: "object",

              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },

                message: {
                  type: "string",
                  example: "User deleted successfully",
                },

                data: {
                  type: "object",
                  nullable: true,
                  example: null,
                },
              },
            },
          },
        },
      },

      401: {
        description:
          "Unauthorized - access token is missing or invalid",
      },

      404: {
        description: "User not found",
      },

      500: {
        description: "Internal server error",
      },
    },
  },
  },

  "/api/user/v1/global-users": {
    get: {
      tags: ["Users"],
      summary: "List global users",
      description: "Paginated list of users with optional search.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
        },
        {
          name: "search",
          in: "query",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Global users fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },
};

export default userSwagger;
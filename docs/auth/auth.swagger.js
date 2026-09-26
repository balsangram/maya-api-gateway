const authSwagger = {
  "/api/auth/v1/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      description: "Creates a new user account.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              type: "object",

              required: ["username", "email", "password"],

              properties: {
                username: {
                  type: "string",
                  example: "Earl.Kovacek78",
                },

                email: {
                  type: "string",
                  format: "email",
                  example: "jyotiranjanpal.sipu@gmail.com",
                },

                password: {
                  type: "string",
                  format: "password",
                  example: "1234",
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: "User registered successfully",

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
                    example: "User registered successfully",
                  },

                  data: {
                    type: "object",

                    properties: {
                      id: {
                        type: "string",
                        example: "6aa32159172088d9d4ed5cdb",
                      },

                      username: {
                        type: "string",
                        example: "Earl.Kovacek78",
                      },

                      email: {
                        type: "string",
                        example: "pal@gmail.com",
                      },

                      role: {
                        type: "string",
                        example: "User",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        400: {
          description: "Bad request",
        },
      },
    },
  },

  "/api/auth/v1/login": {
  post: {
    tags: ["Auth"],
    summary: "Login user",
    description: "Authenticate a user and return access and refresh tokens.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            required: ["email", "password"],

            properties: {
              email: {
                type: "string",
                format: "email",
                example: "balsangram04@gmail.com",
              },

              password: {
                type: "string",
                format: "password",
                example: "1234",
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "User logged in successfully",

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
                  example: "User logged in successfully",
                },

                data: {
                  type: "object",

                  properties: {
                    id: {
                      type: "string",
                      example: "6a84a773851467a49aecf846",
                    },

                    username: {
                      type: "string",
                      example: "education",
                    },

                    email: {
                      type: "string",
                      example: "balsangram04@gmail.com",
                    },

                    role: {
                      type: "string",
                      example: "User",
                    },

                    accessToken: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIs...",
                    },

                    refreshToken: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIs...",
                    },
                  },
                },
              },
            },
          },
        },
      },

      400: {
        description: "Invalid email or password",
      },

      401: {
        description: "Unauthorized",
      },
    },
  },
},

"/api/auth/v1/logout": {
  post: {
    tags: ["Auth"],
    summary: "Logout user",
    description:
      "Logs out the user by invalidating the refresh token and FCM token.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            required: ["refreshToken"],

            properties: {
              fcmToken: {
                type: "string",
                example: "",
                description: "FCM device token. Can be empty.",
              },

              refreshToken: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIs...",
                description: "Refresh token received during login.",
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "User logged out successfully",

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
                  example: "User logged out successfully",
                },
              },
            },
          },
        },
      },

      400: {
        description: "Invalid refresh token or request",
      },

      401: {
        description: "Unauthorized",
      },
    },
  },
},

"/api/auth/v1/forgot-password": {
  post: {
    tags: ["Auth"],
    summary: "Change user password",
    description: "Changes the user's password using the user ID.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            required: ["userId", "newPassword"],

            properties: {
              userId: {
                type: "string",
                example: "6a84a773851467a49aecf846",
                description: "User ID",
              },

              newPassword: {
                type: "string",
                format: "password",
                example: "12345",
                description: "New password",
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "Password changed successfully",

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
                  example: "Password changed successfully",
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
        description: "Invalid user ID or password",
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

"/api/auth/v1/change-password": {
  post: {
    tags: ["Auth"],
    summary: "Change user password",
    description:
      "Changes the authenticated user's password. Requires a valid access token.",

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

            required: ["oldPassword", "newPassword"],

            properties: {
              oldPassword: {
                type: "string",
                format: "password",
                example: "12345",
                description: "Current password",
              },

              newPassword: {
                type: "string",
                format: "password",
                example: "1234",
                description: "New password",
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "Password changed successfully",

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
                  example: "Change password successfully",
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
        description: "Password update failed",
      },

      401: {
        description: "Unauthorized or incorrect old password",
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

"/api/auth/v1/send-otp": {
  post: {
    tags: ["Auth"],
    summary: "Send OTP",
    description: "Sends a one-time password (OTP) to the user's registered email address.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            required: ["email"],

            properties: {
              email: {
                type: "string",
                format: "email",
                example: "jyotiranjanpal.sipu@gmail.com",
                description: "User's registered email address.",
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "OTP sent successfully",

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
                  example: "OTP sent successfully",
                },

                data: {
                  type: "object",

                  properties: {
                    userId: {
                      type: "string",
                      example: "6a87328a2e2d0534bb53966a",
                      description: "User ID associated with the email address.",
                    },
                  },
                },
              },
            },
          },
        },
      },

      400: {
        description: "Invalid email or request",
      },

      404: {
        description: "User not found",
      },

      500: {
        description: "Failed to send OTP",
      },
    },
  },
},

"/api/auth/v1/verify-otp": {
  post: {
    tags: ["Auth"],
    summary: "Verify OTP",
    description: "Verifies the OTP sent to the user's registered email address.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            required: ["userId", "otp"],

            properties: {
              userId: {
                type: "string",
                example: "6a84a773851467a49aecf846",
                description: "User ID received from the send OTP API.",
              },

              otp: {
                type: "string",
                example: "841648",
                description: "OTP received by the user.",
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "OTP verified successfully",

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
                  example: "OTP verified successfully",
                },

                data: {
                  type: "string",
                  example: "6a84a773851467a49aecf846",
                  description: "User ID for the verified user.",
                },
              },
            },
          },
        },
      },

      400: {
        description: "Invalid or expired OTP",
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

};

export default authSwagger;
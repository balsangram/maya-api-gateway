const postSwagger = {
  "/api/post/v1": {
    get: {
      tags: ["Posts"],
      summary: "Get all posts",
      description:
        "Retrieves a paginated list of active posts.",
      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          in: "query",
          name: "page",
          required: false,
          schema: {
            type: "integer",
            minimum: 1,
            default: 1,
          },
          description: "Page number",
          example: 1,
        },
        {
          in: "query",
          name: "limit",
          required: false,
          schema: {
            type: "integer",
            minimum: 1,
            default: 10,
          },
          description: "Number of posts per page",
          example: 10,
        },
      ],

      responses: {
        200: {
          description: "Posts retrieved successfully",
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
                    example: "Posts retrieved successfully",
                  },

                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example:
                            "6aa98f2f640843ab5fe3dee9",
                        },

                        userId: {
                          type: "string",
                          example:
                            "6a8483a94b79d4978bb16a9c",
                        },

                        description: {
                          type: "string",
                          example: "new lucky",
                        },

                        images: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              url: {
                                type: "string",
                                format: "uri",
                                example:
                                  "https://res.cloudinary.com/dr3rcfbpm/image/upload/v1789499089/joms/posts/images/acgsp2cysfb8q4w2pyct.jpg",
                              },
                              mediaId: {
                                type: "string",
                                example:
                                  "joms/posts/images/acgsp2cysfb8q4w2pyct",
                              },
                            },
                          },
                        },

                        videos: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              url: {
                                type: "string",
                                format: "uri",
                                example:
                                  "https://res.cloudinary.com/dr3rcfbpm/video/upload/joms/posts/videos/example.mp4",
                              },
                              mediaId: {
                                type: "string",
                                example:
                                  "joms/posts/videos/example",
                              },
                            },
                          },
                        },

                        isActive: {
                          type: "boolean",
                          example: true,
                        },

                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example:
                            "2026-09-15T18:32:15.399Z",
                        },

                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          example:
                            "2026-09-15T19:04:50.627Z",
                        },

                        __v: {
                          type: "integer",
                          example: 0,
                        },
                      },
                    },
                  },

                  pagination: {
                    type: "object",
                    properties: {
                      currentPage: {
                        type: "integer",
                        example: 1,
                      },

                      limit: {
                        type: "integer",
                        example: 10,
                      },

                      totalItems: {
                        type: "integer",
                        example: 3,
                      },

                      totalPages: {
                        type: "integer",
                        example: 1,
                      },

                      hasNextPage: {
                        type: "boolean",
                        example: false,
                      },

                      hasPreviousPage: {
                        type: "boolean",
                        example: false,
                      },
                    },
                  },
                },
              },

              example: {
                success: true,
                message: "Posts retrieved successfully",
                data: [
                  {
                    _id: "6aa98f2f640843ab5fe3dee9",
                    userId: "6a8483a94b79d4978bb16a9c",
                    description: "new lucky",
                    images: [
                      {
                        url: "https://res.cloudinary.com/dr3rcfbpm/image/upload/v1789499089/joms/posts/images/acgsp2cysfb8q4w2pyct.jpg",
                        mediaId:
                          "joms/posts/images/acgsp2cysfb8q4w2pyct",
                      },
                      {
                        url: "https://res.cloudinary.com/dr3rcfbpm/image/upload/v1789499089/joms/posts/images/ifnmgji97nur7opxqhnq.jpg",
                        mediaId:
                          "joms/posts/images/ifnmgji97nur7opxqhnq",
                      },
                    ],
                    videos: [],
                    isActive: true,
                    createdAt:
                      "2026-09-15T18:32:15.399Z",
                    updatedAt:
                      "2026-09-15T19:04:50.627Z",
                    __v: 0,
                  },
                ],
                pagination: {
                  currentPage: 1,
                  limit: 10,
                  totalItems: 3,
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
                message: "Unauthorized",
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
        post: {
      tags: ["Posts"],
      summary: "Create a new post",
      description:
        "Creates a new post with a description and optional multiple images/videos. Images and videos are uploaded using multipart/form-data.",

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
              required: ["description"],
              properties: {
                description: {
                  type: "string",
                  description: "Post description",
                  example: "My photo",
                },

                images: {
                  type: "array",
                  description: "Post images. Maximum 10 images.",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                  maxItems: 10,
                },

                videos: {
                  type: "array",
                  description: "Post videos. Maximum 5 videos.",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                  maxItems: 5,
                },
              },
            },

            encoding: {
              images: {
                style: "form",
              },
              videos: {
                style: "form",
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: "Post created successfully",
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
                    example: "Post created successfully",
                  },

                  data: {
                    type: "object",
                    nullable: true,
                    properties: {
                      _id: {
                        type: "string",
                        example: "6aa98f2f640843ab5fe3dee9",
                      },

                      userId: {
                        type: "string",
                        example: "6a8483a94b79d4978bb16a9c",
                      },

                      description: {
                        type: "string",
                        example: "My photo",
                      },

                      images: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            url: {
                              type: "string",
                              format: "uri",
                              example:
                                "https://res.cloudinary.com/dr3rcfbpm/image/upload/v1789499089/joms/posts/images/acgsp2cysfb8q4w2pyct.jpg",
                            },

                            mediaId: {
                              type: "string",
                              example:
                                "joms/posts/images/acgsp2cysfb8q4w2pyct",
                            },
                          },
                        },
                      },

                      videos: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            url: {
                              type: "string",
                              format: "uri",
                              example:
                                "https://res.cloudinary.com/dr3rcfbpm/video/upload/joms/posts/videos/example.mp4",
                            },

                            mediaId: {
                              type: "string",
                              example:
                                "joms/posts/videos/example",
                            },
                          },
                        },
                      },

                      isActive: {
                        type: "boolean",
                        example: true,
                      },

                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example:
                          "2026-09-17T15:30:00.000Z",
                      },

                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example:
                          "2026-09-17T15:30:00.000Z",
                      },
                    },
                  },
                },
              },

              example: {
                success: true,
                message: "Post created successfully",
                data: {
                  _id: "6aa98f2f640843ab5fe3dee9",
                  userId: "6a8483a94b79d4978bb16a9c",
                  description: "My photo",
                  images: [
                    {
                      url: "https://res.cloudinary.com/dr3rcfbpm/image/upload/v1789499089/joms/posts/images/acgsp2cysfb8q4w2pyct.jpg",
                      mediaId:
                        "joms/posts/images/acgsp2cysfb8q4w2pyct",
                    },
                    {
                      url: "https://res.cloudinary.com/dr3rcfbpm/image/upload/v1789499089/joms/posts/images/ifnmgji97nur7opxqhnq.jpg",
                      mediaId:
                        "joms/posts/images/ifnmgji97nur7opxqhnq",
                    },
                  ],
                  videos: [],
                  isActive: true,
                  createdAt:
                    "2026-09-17T15:30:00.000Z",
                  updatedAt:
                    "2026-09-17T15:30:00.000Z",
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
                message: "Description is required",
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
                message: "Unauthorized",
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
  }
  ,
"/api/post/v1/{postId}": {
  patch: {
    tags: ["Posts"],
    summary: "Edit a post",
    description:
      "Updates a post description and/or replaces multiple images and videos. Multiple media can be replaced in a single request.",

    security: [
      {
        bearerAuth: [],
      },
    ],

    parameters: [
      {
        in: "path",
        name: "postId",
        required: true,
        schema: {
          type: "string",
        },
        description: "ID of the post to update",
        example: "6aac1c75ace9a410077f0df9",
      },
    ],

    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              description: {
                type: "string",
                description: "Updated post description",
                example: "My updated post",
              },

              imageMediaIds: {
                type: "string",
                description:
                  "JSON array of existing image mediaIds. Each mediaId maps to the image at the same position.",
                example:
                  '["joms/posts/images/kdgd1rosnefhffoymvp0","joms/posts/images/rym0zjp9gd6haqc2uli8"]',
              },

              images: {
                type: "array",
                description:
                  "New images. images[0] replaces imageMediaIds[0], images[1] replaces imageMediaIds[1], etc. Maximum 10 images.",
                items: {
                  type: "string",
                  format: "binary",
                },
                maxItems: 10,
              },

              videoMediaIds: {
                type: "string",
                description:
                  "JSON array of existing video mediaIds. Each mediaId maps to the video at the same position.",
                example:
                  '["joms/posts/videos/old-video-1","joms/posts/videos/old-video-2"]',
              },

              videos: {
                type: "array",
                description:
                  "New videos. videos[0] replaces videoMediaIds[0], videos[1] replaces videoMediaIds[1], etc. Maximum 5 videos.",
                items: {
                  type: "string",
                  format: "binary",
                },
                maxItems: 5,
              },
            },
          },

          encoding: {
            images: {
              style: "form",
              explode: true,
            },

            videos: {
              style: "form",
              explode: true,
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "Post updated successfully",
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
                  example: "Post updated successfully",
                },

                data: {
                  nullable: true,
                  example: null,
                },
              },
            },

            example: {
              success: true,
              message: "Post updated successfully",
              data: null,
            },
          },
        },
      },

      400: {
        description: "Bad request",
        content: {
          "application/json": {
            examples: {
              noUpdate: {
                summary: "No update provided",
                value: {
                  success: false,
                  message: "Please provide something to update",
                },
              },

              invalidImageMediaIds: {
                summary: "Invalid image media IDs",
                value: {
                  success: false,
                  message:
                    "Number of imageMediaIds must match number of images",
                },
              },

              invalidVideoMediaIds: {
                summary: "Invalid video media IDs",
                value: {
                  success: false,
                  message:
                    "Number of videoMediaIds must match number of videos",
                },
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
              message: "Unauthorized",
            },
          },
        },
      },

      403: {
        description: "User is not allowed to edit this post",
        content: {
          "application/json": {
            example: {
              success: false,
              message: "You are not allowed to edit this post",
            },
          },
        },
      },

      404: {
        description: "Post or media not found",
        content: {
          "application/json": {
            examples: {
              postNotFound: {
                summary: "Post not found",
                value: {
                  success: false,
                  message: "Post not found",
                },
              },

              imageNotFound: {
                summary: "Image not found",
                value: {
                  success: false,
                  message:
                    "Image not found: joms/posts/images/example",
                },
              },

              videoNotFound: {
                summary: "Video not found",
                value: {
                  success: false,
                  message:
                    "Video not found: joms/posts/videos/example",
                },
              },
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

  delete: {
    tags: ["Posts"],
    summary: "Delete a post",
    description:
      "Deletes a post using its post ID. Only the owner of the post can delete it.",

    security: [
      {
        bearerAuth: [],
      },
    ],

    parameters: [
      {
        in: "path",
        name: "postId",
        required: true,
        schema: {
          type: "string",
        },
        description: "ID of the post to delete",
        example: "6aa98f2f640843ab5fe3dee9",
      },
    ],

    responses: {
      200: {
        description: "Post deleted successfully",
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
                  example: "Post deleted successfully",
                },

                data: {
                  nullable: true,
                  example: null,
                },
              },
            },

            example: {
              success: true,
              message: "Post deleted successfully",
              data: null,
            },
          },
        },
      },

      400: {
        description: "Invalid post ID",
        content: {
          "application/json": {
            example: {
              success: false,
              message: "Invalid post ID",
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
              message: "Unauthorized",
            },
          },
        },
      },

      404: {
        description: "Post not found",
        content: {
          "application/json": {
            example: {
              success: false,
              message: "Post not found",
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

export default postSwagger;
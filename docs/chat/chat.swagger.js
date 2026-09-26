const bearer = [{ bearerAuth: [] }];

const objectId = {
  type: "string",
  example: "6a8349fe7a9ab2797ec0badf",
};

const successSchema = (dataExample = null) => ({
  type: "object",
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string" },
    data:
      dataExample === null
        ? { nullable: true, example: null }
        : dataExample,
  },
});

const chatSwagger = {
  "/api/chats/v1/private": {
    post: {
      tags: ["Chat"],
      summary: "Create private (1-to-1) chat",
      description:
        "Creates a private chat with another user, or returns the existing one.",
      security: bearer,
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["userId"],
              properties: {
                userId: {
                  ...objectId,
                  description: "Friend / other participant user ID",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Private chat created successfully",
          content: {
            "application/json": {
              schema: successSchema({ type: "object" }),
            },
          },
        },
        400: { description: "Bad request" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/chats/v1/group": {
    post: {
      tags: ["Chat"],
      summary: "Create group chat",
      description:
        "Creates a group chat. Send multipart/form-data when uploading a group image.",
      security: bearer,
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["groupName"],
              properties: {
                groupName: {
                  type: "string",
                  example: "Weekend Trip",
                },
                memberIds: {
                  type: "string",
                  description:
                    'JSON array of user IDs, e.g. ["id1","id2"]',
                  example: '["6a8349fe7a9ab2797ec0badf"]',
                },
                groupImage: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
          "application/json": {
            schema: {
              type: "object",
              required: ["groupName"],
              properties: {
                groupName: {
                  type: "string",
                  example: "Weekend Trip",
                },
                memberIds: {
                  type: "array",
                  items: objectId,
                  example: ["6a8349fe7a9ab2797ec0badf"],
                },
                groupImage: {
                  type: "string",
                  example: "https://example.com/group.jpg",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Group created successfully",
          content: {
            "application/json": {
              schema: successSchema({ type: "object" }),
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/chats/v1": {
    get: {
      tags: ["Chat"],
      summary: "List logged-in user's chats",
      description: "GET {{baseUrl}}/api/chats/v1",
      security: bearer,
      responses: {
        200: {
          description: "Chats fetched successfully",
          content: {
            "application/json": {
              schema: successSchema({
                type: "array",
                items: { type: "object" },
              }),
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/chats/v1/{chatId}": {
    get: {
      tags: ["Chat"],
      summary: "Get chat details",
      security: bearer,
      parameters: [
        {
          name: "chatId",
          in: "path",
          required: true,
          schema: objectId,
        },
      ],
      responses: {
        200: {
          description: "Chat details fetched successfully",
          content: {
            "application/json": {
              schema: successSchema({ type: "object" }),
            },
          },
        },
        401: { description: "Unauthorized" },
        404: { description: "Chat not found" },
      },
    },
    delete: {
      tags: ["Chat"],
      summary: "Delete / deactivate chat",
      security: bearer,
      parameters: [
        {
          name: "chatId",
          in: "path",
          required: true,
          schema: objectId,
        },
      ],
      responses: {
        200: {
          description: "Chat deleted successfully",
          content: {
            "application/json": {
              schema: successSchema(null),
            },
          },
        },
        401: { description: "Unauthorized" },
        404: { description: "Chat not found" },
      },
    },
  },
};

export default chatSwagger;

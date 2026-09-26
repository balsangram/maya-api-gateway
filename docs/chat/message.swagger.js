const bearer = [{ bearerAuth: [] }];

const objectId = {
  type: "string",
  example: "6a8349fe7a9ab2797ec0badf",
};

const messageSwagger = {
  "/api/messages/v1/chat/{chatId}": {
    get: {
      tags: ["Messages"],
      summary: "Get messages for a chat",
      security: bearer,
      parameters: [
        {
          name: "chatId",
          in: "path",
          required: true,
          schema: objectId,
        },
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 20 },
        },
      ],
      responses: {
        200: { description: "Messages fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/messages/v1": {
    post: {
      tags: ["Messages"],
      summary: "Send text or media message",
      description:
        "Use multipart/form-data when attaching a file. For text-only, JSON is fine.",
      security: bearer,
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["chatId"],
              properties: {
                chatId: objectId,
                messageType: {
                  type: "string",
                  example: "text",
                  description: "e.g. text, image, video, audio, file",
                },
                message: {
                  type: "string",
                  example: "Hello!",
                },
                replyTo: {
                  type: "string",
                  description: "Optional message ID being replied to",
                  example: "6aa32159172088d9d4ed5cdb",
                },
                file: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
          "application/json": {
            schema: {
              type: "object",
              required: ["chatId"],
              properties: {
                chatId: objectId,
                messageType: {
                  type: "string",
                  example: "text",
                },
                message: {
                  type: "string",
                  example: "Hello!",
                },
                replyTo: {
                  type: "string",
                  nullable: true,
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Message sent successfully" },
        400: { description: "Bad request" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/messages/v1/{messageId}": {
    patch: {
      tags: ["Messages"],
      summary: "Edit message",
      security: bearer,
      parameters: [
        {
          name: "messageId",
          in: "path",
          required: true,
          schema: objectId,
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["message"],
              properties: {
                message: {
                  type: "string",
                  example: "Updated text",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Message updated successfully" },
        401: { description: "Unauthorized" },
        404: { description: "Message not found" },
      },
    },
    delete: {
      tags: ["Messages"],
      summary: "Delete message",
      security: bearer,
      parameters: [
        {
          name: "messageId",
          in: "path",
          required: true,
          schema: objectId,
        },
      ],
      responses: {
        200: { description: "Message deleted successfully" },
        401: { description: "Unauthorized" },
        404: { description: "Message not found" },
      },
    },
  },

  "/api/messages/v1/{messageId}/forward": {
    post: {
      tags: ["Messages"],
      summary: "Forward message to one or more chats",
      security: bearer,
      parameters: [
        {
          name: "messageId",
          in: "path",
          required: true,
          schema: objectId,
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["chatIds"],
              properties: {
                chatIds: {
                  type: "array",
                  items: objectId,
                  example: ["6a8349fe7a9ab2797ec0badf"],
                  description: "Target chat IDs",
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Message forwarded successfully" },
        401: { description: "Unauthorized" },
        404: { description: "Message not found" },
      },
    },
  },

  "/api/messages/v1/{messageId}/read": {
    patch: {
      tags: ["Messages"],
      summary: "Mark message as read",
      security: bearer,
      parameters: [
        {
          name: "messageId",
          in: "path",
          required: true,
          schema: objectId,
        },
      ],
      responses: {
        200: { description: "Message marked as read" },
        401: { description: "Unauthorized" },
        404: { description: "Message not found" },
      },
    },
  },
};

export default messageSwagger;

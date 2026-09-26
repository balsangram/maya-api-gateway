const bearer = [{ bearerAuth: [] }];

const objectId = {
  type: "string",
  example: "6a8349fe7a9ab2797ec0badf",
};

const pathParams = (names) =>
  names.map((name) => ({
    name,
    in: "path",
    required: true,
    schema: objectId,
  }));

const groupSwagger = {
  "/api/groups/v1/{groupId}/members": {
    get: {
      tags: ["Groups"],
      summary: "Get group members",
      security: bearer,
      parameters: pathParams(["groupId"]),
      responses: {
        200: { description: "Group members fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
    post: {
      tags: ["Groups"],
      summary: "Add group member",
      security: bearer,
      parameters: pathParams(["groupId"]),
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
                  description: "User ID to add to the group",
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Member added successfully" },
        400: { description: "Bad request" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/groups/v1/{groupId}/members/{userId}": {
    delete: {
      tags: ["Groups"],
      summary: "Remove group member",
      security: bearer,
      parameters: pathParams(["groupId", "userId"]),
      responses: {
        200: { description: "Member removed successfully" },
        401: { description: "Unauthorized" },
        404: { description: "Member not found" },
      },
    },
  },

  "/api/groups/v1/{groupId}/members/{userId}/block": {
    patch: {
      tags: ["Groups"],
      summary: "Block group member",
      security: bearer,
      parameters: pathParams(["groupId", "userId"]),
      responses: {
        200: { description: "Member blocked successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/groups/v1/{groupId}/members/{userId}/unblock": {
    patch: {
      tags: ["Groups"],
      summary: "Unblock group member",
      security: bearer,
      parameters: pathParams(["groupId", "userId"]),
      responses: {
        200: { description: "Member unblocked successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/groups/v1/{groupId}/members/{userId}/admin": {
    patch: {
      tags: ["Groups"],
      summary: "Make member a group admin",
      security: bearer,
      parameters: pathParams(["groupId", "userId"]),
      responses: {
        200: { description: "Member is now an admin" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/groups/v1/{groupId}/members/{userId}/remove-admin": {
    patch: {
      tags: ["Groups"],
      summary: "Remove admin permission",
      security: bearer,
      parameters: pathParams(["groupId", "userId"]),
      responses: {
        200: { description: "Admin permission removed" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/groups/v1/{groupId}/leave": {
    post: {
      tags: ["Groups"],
      summary: "Leave group",
      security: bearer,
      parameters: pathParams(["groupId"]),
      responses: {
        200: { description: "You left the group successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/groups/v1/{groupId}": {
    patch: {
      tags: ["Groups"],
      summary: "Update group name / image",
      security: bearer,
      parameters: pathParams(["groupId"]),
      requestBody: {
        required: false,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                groupName: {
                  type: "string",
                  example: "New Group Name",
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
              properties: {
                groupName: {
                  type: "string",
                  example: "New Group Name",
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
        200: { description: "Group updated successfully" },
        401: { description: "Unauthorized" },
        404: { description: "Group not found" },
      },
    },
  },
};

export default groupSwagger;

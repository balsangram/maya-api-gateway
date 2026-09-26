const bearer = [{ bearerAuth: [] }];

const adminSwagger = {
  "/api/admin/v1/profile": {
    get: {
      tags: ["Admin"],
      summary: "Get admin profile",
      security: bearer,
      responses: {
        200: { description: "Admin profile retrieved successfully" },
        401: { description: "Unauthorized" },
        403: { description: "Forbidden" },
      },
    },
    put: {
      tags: ["Admin"],
      summary: "Update admin profile",
      security: bearer,
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Admin" },
                phone: { type: "string", example: "9876543210" },
                image: {
                  type: "string",
                  example: "https://example.com/admin.jpg",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Admin profile updated successfully" },
        401: { description: "Unauthorized" },
        403: { description: "Forbidden" },
      },
    },
  },
};

export default adminSwagger;

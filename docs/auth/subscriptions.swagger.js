const bearer = [{ bearerAuth: [] }];

const subscriptionsSwagger = {
  "/api/subscriptions/v1/subscribe": {
    post: {
      tags: ["Subscriptions"],
      summary: "Subscribe to a plan",
      description:
        "Creates a Razorpay order for the selected plan. Use the returned order with Razorpay checkout, then call payment verify.",
      security: bearer,
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["planId"],
              properties: {
                planId: {
                  type: "string",
                  example: "6a81d9a9e81f24b64a8aea0e",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Razorpay order created successfully" },
        400: { description: "Bad request" },
        401: { description: "Unauthorized" },
        404: { description: "Plan not found" },
      },
    },
  },

  "/api/subscriptions/v1/cancel": {
    patch: {
      tags: ["Subscriptions"],
      summary: "Cancel subscription",
      description:
        "Schedules the active subscription for cancellation at period end.",
      security: bearer,
      responses: {
        200: { description: "Subscription cancelled successfully" },
        400: { description: "Subscription is not active" },
        401: { description: "Unauthorized" },
        404: { description: "Subscription not found" },
      },
    },
  },

  "/api/subscriptions/v1/resubscribe": {
    patch: {
      tags: ["Subscriptions"],
      summary: "Resubscribe to cancelled plan",
      description:
        "Creates a Razorpay order to reactivate a cancelled subscription.",
      security: bearer,
      responses: {
        200: { description: "Razorpay order created successfully" },
        400: { description: "Cannot resubscribe" },
        401: { description: "Unauthorized" },
        404: { description: "Subscription not found" },
      },
    },
  },
};

export default subscriptionsSwagger;

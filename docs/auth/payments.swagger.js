const bearer = [{ bearerAuth: [] }];

const paymentsSwagger = {
  "/api/payments/v1/verify": {
    post: {
      tags: ["Payments"],
      summary: "Verify Razorpay payment",
      description:
        "Verifies Razorpay checkout signature and saves the payment record.",
      security: bearer,
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "razorpay_order_id",
                "razorpay_payment_id",
                "razorpay_signature",
              ],
              properties: {
                razorpay_order_id: {
                  type: "string",
                  example: "order_TeGTPZfO1z6nb7",
                },
                razorpay_payment_id: {
                  type: "string",
                  example: "pay_TeGTU5LqqNLeul",
                },
                razorpay_signature: {
                  type: "string",
                  example:
                    "ea8b0fff1f12aea1364269c32d7b6a53921b0ed962e9b18a3f30e1cdfbc423fa",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Payment verified successfully" },
        400: { description: "Payment verification failed" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/payments/v1/recheck": {
    get: {
      tags: ["Payments"],
      summary: "Recheck payment / subscription status",
      description:
        "Checks whether the logged-in user has an active subscription.",
      security: bearer,
      responses: {
        200: { description: "Subscription status fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/payments/v1/webhook": {
    post: {
      tags: ["Payments"],
      summary: "Razorpay webhook",
      description:
        "Handles Razorpay webhook events. Called by Razorpay, not the client.",
      parameters: [
        {
          name: "x-razorpay-signature",
          in: "header",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "Webhook processed successfully" },
        400: { description: "Invalid webhook signature or payload" },
      },
    },
  },
};

export default paymentsSwagger;

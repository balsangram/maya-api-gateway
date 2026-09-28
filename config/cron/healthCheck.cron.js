import axios from "axios";
import cron from "node-cron";

const API_URLS = [

  {
    name: "Auth Service",
    url: "https://maya-auth-service.onrender.com",
  },
  {
    name: "Chat Service",
    url: "https://maya-chat-service.onrender.com",
  },
  {
    name: "Post Service",
    url: "https://maya-post-service.onrender.com",
  },
  {
    name: "User Service",
    url: "https://maya-api-gateway.onrender.com",
  },
];

export const checkAllServices = async () => {
  console.log("\n========== HEALTH CHECK STARTED ==========");

  const results = await Promise.all(
    API_URLS.map(async (api) => {
      const startTime = Date.now();

      try {
        const response = await axios.get(api.url, {
          timeout: 10000,
        });

        const responseTime = Date.now() - startTime;

        console.log(
          `✅ ${api.name} | ${response.status} | ${responseTime}ms`
        );

        return {
          name: api.name,
          url: api.url,
          status: "UP",
          statusCode: response.status,
          responseTime: `${responseTime}ms`,
        };
      } catch (error) {
        const responseTime = Date.now() - startTime;

        console.error(
          `❌ ${api.name} | ${
            error.response?.status || "DOWN"
          } | ${responseTime}ms`
        );

        return {
          name: api.name,
          url: api.url,
          status: "DOWN",
          statusCode: error.response?.status || null,
          responseTime: `${responseTime}ms`,
          message: error.message,
        };
      }
    })
  );

  console.log("========== HEALTH CHECK COMPLETED ==========\n");

  return results;
};

// Run every 5 minutes
cron.schedule("*/10 * * * *", async () => {
  await checkAllServices();
});

// Run once when server starts
checkAllServices();
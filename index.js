import http from "http";
import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

const AUTH_URL = process.env.AUTH_SERVICE_URL;
const CHAT_URL = process.env.CHAT_SERVICE_URL;
const POST_URL = process.env.POST_SERVICE_URL;

console.log("AUTH:", AUTH_URL, "CHAT:", CHAT_URL, "POST:", POST_URL);

// ============================================================
// Swagger UI
// ============================================================
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Maya Friends API Docs",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: "none",
      filter: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  })
);

// ──────────────────────────────────────────────
// Proxy factory
// ──────────────────────────────────────────────
const proxy = (target, { ws = false } = {}) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    ws,
    pathRewrite: (_path, req) => req.originalUrl,
    on: {
      error: (_err, _req, res) => {
        if (res && !res.headersSent && typeof res.writeHead === "function") {
          res.writeHead(502, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              message: `Upstream service unavailable (${target})`,
            })
          );
        }
      },
    },
  });

const authProxy = proxy(AUTH_URL);
const chatProxy = proxy(CHAT_URL, { ws: true });
const postProxy = proxy(POST_URL);

// Socket.IO → Chat Service (WebSocket upgrade)
app.use("/socket.io", chatProxy);

// Auth Service → 7001
app.use(
  [
    "/api/auth",
    "/api/user",
    "/api/admin",
    "/api/plan",
    "/api/payments",
    "/api/subscriptions",
    "/auth/health",
  ],
  authProxy
);

// Chat Service → 7002
app.use(
  [
    "/api/chat",
    "/api/chats",
    "/api/friends",
    "/api/messages",
    "/api/groups",
    "/chat/health",
  ],
  chatProxy
);

// Post Service → 7003
app.use(["/api/post", "/api/posts", "/post/health"], postProxy);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API Gateway is running",
    port: PORT,
    services: {
      auth: AUTH_URL,
      chat: CHAT_URL,
      post: POST_URL,
    },
    socket: {
      url: `http://localhost:${PORT}`,
      path: "/socket.io",
      note: "Connect Socket.IO to gateway or directly to chat service",
    },
  });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found on gateway",
  });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
  console.log(`Socket.IO proxy → ${CHAT_URL}/socket.io`);
});

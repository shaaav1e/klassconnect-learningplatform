/**
 * Simple CORS proxy for local development
 * Run with: node cors-proxy.js
 */
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors({ origin: "*" }));

// Proxy all requests to the backend server
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://klassconnect-backend.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Remove /api prefix when forwarding to target
    },
    onProxyRes: function (proxyRes, req, res) {
      // Add CORS headers to the proxied response
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Methods"] =
        "GET, POST, PUT, DELETE, OPTIONS";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Content-Type, Authorization";
    },
    onError: (err, req, res) => {
      console.error("Proxy Error:", err);
      res.status(500).json({ error: "Proxy error", message: err.message });
    },
  })
);

// Start the server
app.listen(PORT, () => {
  console.log(`CORS Proxy running on http://localhost:${PORT}/api`);
  console.log(
    `Use http://localhost:${PORT}/api/status to access backend status endpoint`
  );
});

// Instructions for use:
console.log("\nTo use this proxy:");
console.log(
  "1. Install dependencies: npm install express cors http-proxy-middleware"
);
console.log("2. Run this script: node cors-proxy.js");
console.log("3. Change BACKEND_URL in quiz.js to: http://localhost:3000/api");

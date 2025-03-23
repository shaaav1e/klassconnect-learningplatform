import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // Use 0.0.0.0 to allow access from any device on the network
    host: "0.0.0.0",

    // Allow Vite to find an available port if 5176 is in use
    port: 5176,
    strictPort: false, // Don't fail if port is already in use

    // Keep the proxy for local development, but don't rely on it in production
    proxy: {
      "/api": {
        target: "https://klassconnect-backend.onrender.com", // Use the production URL directly
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log("Received Response:", proxyRes.statusCode, req.url);
          });
        },
      },
    },
    open: "/index.html",
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        dashboard: "dashboard.html",
        quiz: "quiz.html",
        login: "login.html",
        html: "htmlcourse.html",
      },
    },
  },
});

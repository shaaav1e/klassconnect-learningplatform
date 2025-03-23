import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0", // Change to 0.0.0.0 to allow access from local network devices
    port: 5176,
    proxy: {
      // Add proxy for local development
      "/api": {
        target: "http://localhost:10000",
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

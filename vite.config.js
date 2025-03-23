import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "localhost",
    port: 5176,
    proxy: {
      // Add proxy for local development
      "/api": {
        target: "http://localhost:10000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
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

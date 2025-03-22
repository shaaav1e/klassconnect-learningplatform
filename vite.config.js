import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "localhost", // Optional, but recommended
    port: 5176, // Keep your development port
    // Remove the proxy configuration as we'll use absolute URLs
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        signup: "signup.html",
        dashboard: "dashboard.html",
        quiz: "quiz.html",
        login: "login.html",
      },
    },
  },
});

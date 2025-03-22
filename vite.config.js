import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "localhost", // Optional, but recommended
    port: 5176, // Update this to the current port Vite is running on (5176 as per your previous message)
    proxy: {
      // Proxy API requests to the Flask backend (only used in development)
      "/upload": "http://127.0.0.1:5000",
      "/submit_quiz": "http://127.0.0.1:5000",
    },
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

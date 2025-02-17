import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // Ensure Vite's development server runs on the desired host and port
    host: 'localhost', // Optional, but recommended
    port: 5173,        // This is the default, but you can change if necessary
    hmr: {
      protocol: 'ws',     // WebSocket connection
      host: 'localhost',  // Specify the host for HMR
      port: 5174,         // Ensure it matches the WebSocket connection port
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',        // Entry point for the main page
        signup: 'signup.html',     // Entry point for signup page
        dashboard: 'dashboard.html',
        quiz: 'quiz.html',
        login: 'login.html'
      }
    }
  },
});

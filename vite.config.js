import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',        // Entry point for the main page
        signup: 'signup.html',     // Entry point for signup page
        dashboard: 'dashboard.html',
        quiz: 'quiz.html'
      }
    }
  },
  // server: {
  //   proxy: {
  //     "/upload": "http://127.0.0.1:5000",
  //     "/submit_quiz": "http://127.0.0.1:5000"
  //   }
  // }
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development, calls to /api/* are forwarded to the backend server
// so the frontend and backend can run on different ports without CORS pain.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});

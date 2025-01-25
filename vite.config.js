import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Conditionally enable proxy for development only
    proxy:
      process.env.NODE_ENV === "development"
        ? {
            "/api": {
              target: "https://backenddeploymentps-production.up.railway.app", // Your backend server
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix before forwarding
            },
          }
        : {},
  },
});

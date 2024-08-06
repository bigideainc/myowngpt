import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000,
  },
  optimizeDeps: {
    include: ["react-dropzone"] // Explicitly pre-bundle react-dropzone
  },
  // resolve: {
  //   alias: {
  //     // Add aliases if there are path resolution issues
  //     'react-dropzone': '/node_modules/react-dropzone/dist/index.js',
  //   }
  // }
});

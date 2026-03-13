import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  // Configuramos dónde se guardará el proyecto final (build)
  build: {
    outDir: "dist",
    emptyOutDir: true, 
  },
  
  server: {
    port: 5173, // Forzamos el puerto por si acaso
  }
});
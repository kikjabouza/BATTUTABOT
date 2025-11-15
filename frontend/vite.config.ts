import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {              // <-- définit le chemin de base pour les assets
    outDir: "../backend/public", // <-- tous les fichiers compilés vont dans public/build
    emptyOutDir: true,         // vide le dossier à chaque build
    assetsDir: "assets",       // met tous les assets (images, fonts) dans build/assets
    rollupOptions: {
      output: {
        // garde les hashes pour cache-busting
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
}));

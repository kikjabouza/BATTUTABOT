import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import { fileURLToPath } from 'url';

// Plugin personnalisé pour copier tout le dossier assets
const copyAssetsPlugin = () => ({
  name: 'copy-assets',
  buildStart() {
    const assetsPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/assets');
    const outputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../backend/public/assets');
    
    if (fs.existsSync(assetsPath)) {
      // Cette logique copiera manuellement les assets
      console.log('📁 Copie des assets depuis:', assetsPath);
    }
  },
});

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // ⭐ AJOUTEZ LA CONFIGURATION DU PROXY ICI
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('❌ Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('🔄 Proxy request:', req.method, req.url);
          });
        }
      }
    }
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    copyAssetsPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: "public",
  build: {
    outDir: "../backend/public",
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
}));
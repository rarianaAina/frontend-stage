import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Permet d'écouter sur toutes les interfaces réseau
    port: 5174,        // Le port que tu utilises
  },
})

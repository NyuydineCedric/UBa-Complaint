import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy only works during local dev (npm run dev)
    // In production, the Express server handles all /api routes
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
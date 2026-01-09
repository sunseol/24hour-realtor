import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    allowedHosts: ['.serveousercontent.com', '.trycloudflare.com', '.loca.lt']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          sanity: ['@sanity/client', '@sanity/image-url']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})

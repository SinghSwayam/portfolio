import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber', '@react-three/drei'],
          animations: ['framer-motion', 'gsap'],
        },
      },
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Vite config mirrors the Vue project's setup:
//  - "@/..." resolves to "src/..." (same alias developers are used to)
//  - React Fast Refresh via @vitejs/plugin-react
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

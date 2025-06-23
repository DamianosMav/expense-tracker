import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
   base: '/expense-tracker//',
  plugins: [
    vue(),
    vueDevTools(),
    
  ],
  test: {
    globals: true,        
    environment: 'jsdom',
    include: ['tests/**/*.spec.js', 'src/**/*.spec.js'],
  },
  server: {
    port:3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

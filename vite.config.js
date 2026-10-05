import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/englishwithmaro/',
  server: {
    port: 3000
  }
})

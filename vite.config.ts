import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/fabenejr.github.io/'  // Corrigindo o caminho base para o GitHub Pages
})

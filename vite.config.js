import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      // 👇 nueva URL de Replit
      '127dd2c7-90b7-41e4-855d-5ad815ec78b4-00-1bsvcil80nf76.janeway.replit.dev'
    ]
  }
})
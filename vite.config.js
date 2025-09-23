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
      'e6689033-981b-43f3-a6c9-7e71c974b81c-00-241su2yzpfeda.janeway.replit.dev'
    ]
  }
})
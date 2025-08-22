import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PUBLIC_INTERFACE
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true, // ensure Vite uses 3000 and fails if unavailable (helps orchestrator detect readiness)
    open: false, // don't attempt to open a browser in container environments
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})

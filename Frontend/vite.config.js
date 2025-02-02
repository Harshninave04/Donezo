import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Ensures live reload works inside Docker
    },
    host: '0.0.0.0', // Bind to all network interfaces
  },
});

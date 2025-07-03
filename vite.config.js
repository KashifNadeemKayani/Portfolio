import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows access from local network (e.g., mobile)
    port: 5173, // or any other port you'd like
  },
})

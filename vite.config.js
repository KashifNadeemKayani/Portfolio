import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), imagetools()],
  server: {
    host: true, // allows access from local network (e.g., mobile)
    port: 5173, // or any other port you'd like
  },
})

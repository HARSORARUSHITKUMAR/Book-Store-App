import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // Explicitly set JSX loader
    include: /src\/.*\.jsx?$/, // Apply to .js and .jsx files in /src
  },
})

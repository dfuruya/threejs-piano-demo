import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/threejs-piano/',
  build: {
    outDir: 'dist/threejs-piano'
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
});

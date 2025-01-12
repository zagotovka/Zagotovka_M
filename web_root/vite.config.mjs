import { defineConfig } from 'vite';
import redirectMiddleware from './server.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [redirectMiddleware()]
});

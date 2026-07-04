import { defineConfig } from 'vite';
import redirectMiddleware from './server.js';

export default defineConfig(({ mode }) => ({
  base: '', // Оставляем относительные пути (без "/" в начале)
  plugins: [redirectMiddleware(mode)],
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString().slice(0, 16)),
  },
}))

import { defineConfig } from 'vite';
import redirectMiddleware from './server.js';

export default defineConfig({
  base: '', // Оставляем относительные пути (без "/" в начале)
  plugins: [redirectMiddleware()],
  // Блок build удаляем, чтобы Vite сам добавлял хеши
})

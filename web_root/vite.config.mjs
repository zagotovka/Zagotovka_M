import { defineConfig } from 'vite';
import redirectMiddleware from './server.js';

export default defineConfig(({ mode }) => ({
  base: '', // Оставляем относительные пути (без "/" в начале)
  plugins: [redirectMiddleware(mode)],
  // Блок build удаляем, чтобы Vite сам добавлял хеши
}))

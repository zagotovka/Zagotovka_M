import { defineConfig } from 'vite';
import redirectMiddleware from './server.js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fwVersion = readFileSync(resolve(__dirname, '../VERSION'), 'utf-8').trim();

export default defineConfig(({ mode }) => ({
  base: '', // Оставляем относительные пути (без "/" в начале)
  plugins: [redirectMiddleware(mode)],
  build: {
    // Меньше HTTP-запросов на загрузку страницы = меньше параллельных TLS-соединений
    // к МК (каждое ~6 КБ heap + handshake). Результат: index.html + 1 JS + 1 CSS.
    cssCodeSplit: false,        // один CSS-файл вместо CSS на каждый чанк
    modulePreload: false,       // без <link rel="modulepreload"> (лишние запросы)
    assetsInlineLimit: 32768,   // мелкие картинки/шрифты — data: внутрь бандла
    rollupOptions: {
      output: { inlineDynamicImports: true }  // один JS-чанк, без lazy-подгрузки
    }
  },
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString().slice(0, 16)),
    __FW_VERSION__: JSON.stringify('v' + fwVersion),
  },
}))

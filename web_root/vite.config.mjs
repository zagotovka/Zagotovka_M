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
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString().slice(0, 16)),
    __FW_VERSION__: JSON.stringify('v' + fwVersion),
  },
}))

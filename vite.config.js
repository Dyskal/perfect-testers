/// <reference types="vitest" />
import { defineConfig } from 'vite';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  test: {
    globals: true,
    includeSource: ['src/**/*.js'],
    environment: 'happy-dom',
    exclude: ['system-tests/**'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
});

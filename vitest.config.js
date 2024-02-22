import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    includeSource: ['src/**/*.js'],
    environment: 'happy-dom',
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
});

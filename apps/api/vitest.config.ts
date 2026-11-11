import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

// SWC preserves decorator metadata, which NestJS dependency injection relies on.
export default defineConfig({
  plugins: [swc.vite()],
  test: {
    environment: 'node',
  },
});

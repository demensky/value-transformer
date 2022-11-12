import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: [
      './test-util/to-yields-return.ts',
      './test-util/to-yields-throw.ts',
      './test-util/to-decode.ts',
    ],
  },
});

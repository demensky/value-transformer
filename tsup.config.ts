import {defineConfig} from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    silent: true,
    format: ['esm'],
    sourcemap: true,
    clean: true,
    esbuildOptions: (options) => {
      options.drop = ['console'];
    },
  },
  {
    entry: ['src/index.ts'],
    silent: true,
    outExtension: () => ({js: '.dev.js'}),
    format: ['esm'],
    sourcemap: true,
    clean: true,
  },
  {
    entry: ['src/index.ts'],
    silent: true,
    clean: true,
    dts: {only: true},
  },
]);

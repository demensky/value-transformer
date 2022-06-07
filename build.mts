import {build} from 'esbuild';

await Promise.all([
  build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true,
    outfile: 'dist/index.mjs',
    format: 'esm',
    drop: ['console'],
  }),
  build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true,
    outfile: 'dist/index.dev.mjs',
    format: 'esm',
  }),
]);

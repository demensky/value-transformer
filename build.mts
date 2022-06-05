import {build} from 'esbuild';

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  outfile: 'dist/index.mjs',
  format: 'esm',
  drop: ['console'],
});

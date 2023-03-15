import type {BuildOptions} from 'esbuild';
import {build} from 'esbuild';

const commonOptions: BuildOptions = {
  bundle: true,
  format: 'esm',
  entryPoints: ['src/index.ts'],
  sourcemap: 'linked',
  sourcesContent: false,
};

await Promise.all([
  build({...commonOptions, outfile: 'src/index.js', drop: ['console']}),
  build({...commonOptions, outfile: 'src/index.dev.js'}),
]);

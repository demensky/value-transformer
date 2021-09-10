import type {RollupOptions} from 'rollup';
import typescript from 'rollup-plugin-typescript2';

const config: readonly RollupOptions[] = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'module',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'commonjs',
        sourcemap: true,
      },
    ],
    plugins: [typescript({tsconfig: './tsconfig.build.json'})],
  },
];

export default config;

import strip from '@rollup/plugin-strip';
import type {RollupOptions} from 'rollup';
import dts from 'rollup-plugin-dts';
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
    plugins: [
      typescript({tsconfig: './tsconfig.build.json'}),
      strip({include: ['**/*.ts']}),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.dev.mjs',
        format: 'module',
        sourcemap: true,
      },
      {
        file: 'dist/index.dev.cjs',
        format: 'commonjs',
        sourcemap: true,
      },
    ],
    plugins: [typescript({tsconfig: './tsconfig.build.json'})],
  },
  {
    input: 'src/index.ts',
    output: [{file: 'dist/index.d.ts', format: 'es'}],
    plugins: [dts()],
  },
];

export default config;

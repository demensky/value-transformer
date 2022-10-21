import type {Config} from '@jest/types';

export default (): Config.InitialOptions => ({
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFilesAfterEnv: [
    './test-util/to-yields-return.ts',
    './test-util/to-yields-throw.ts',
  ],
});

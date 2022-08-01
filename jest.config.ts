import type {Config} from '@jest/types';

export default (): Config.InitialOptions => ({
  preset: 'ts-jest/presets/js-with-ts-esm',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFilesAfterEnv: [
    './test-util/to-yields-return.ts',
    './test-util/to-yields-throw.ts',
  ],
});

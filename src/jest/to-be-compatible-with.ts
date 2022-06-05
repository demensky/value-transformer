import {
  matcherHint,
  printExpected,
  printReceived,
  stringify,
} from 'jest-matcher-utils';

import type {ValueTransformer} from '../base/value-transformer.js';

expect.extend({
  toBeCompatibleWith<T>(
    this: jest.MatcherContext,
    transformer: ValueTransformer<T, T>,
    data: T,
  ): jest.CustomMatcherResult {
    const pass: jest.CustomMatcherResult['pass'] =
      transformer.compatibleWith(data);

    return {
      pass,
      message: () =>
        [
          matcherHint('toBeCompatibleWith', 'transformer', 'data', {
            comment: 'transformer.compatibleWith(data)',
            isNot: this.isNot,
          }),
          '',
          `Data: ${stringify(data)}`,
          '',
          `Expected: ${printExpected(!this.isNot)}`,
          `Received: ${printReceived(this.isNot)}`,
        ].join('\n'),
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCompatibleWith(value: unknown): R;
    }
  }
}

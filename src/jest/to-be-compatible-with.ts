import type {ValueTransformer} from '../base/value-transformer';

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
          this.utils.matcherHint('toBeCompatibleWith', 'transformer', 'data', {
            comment: 'transformer.compatibleWith(data)',
            isNot: this.isNot,
          }),
          '',
          `Data: ${this.utils.stringify(data)}`,
          '',
          `Expected: ${this.utils.printExpected(!this.isNot)}`,
          `Received: ${this.utils.printReceived(this.isNot)}`,
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

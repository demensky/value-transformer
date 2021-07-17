import type {ValueTransformer} from '../base/value-transformer';

expect.extend({
  toBeCompatibleWith<T>(
    transformer: ValueTransformer<T, T>,
    value: T,
  ): jest.CustomMatcherResult {
    return transformer.compatibleWith(value)
      ? {pass: true, message: () => `TODO not text`}
      : {pass: false, message: () => `TODO text`};
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeCompatibleWith(value: unknown): R;
    }
  }
}

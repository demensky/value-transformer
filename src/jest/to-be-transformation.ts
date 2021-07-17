import diff from 'jest-diff';

import type {ValueTransformer} from '../base/value-transformer';

expect.extend({
  toBeTransformation<T>(
    this: jest.MatcherContext,
    transformer: ValueTransformer<T, T>,
    value: T,
    literal: unknown,
  ): jest.CustomMatcherResult {
    const {isNot, promise, expand} = this;
    const methodName = 'toBeTransformation';

    const newLiteral: unknown = transformer.toLiteral(value);

    if (!this.equals(literal, newLiteral, [], true)) {
      return {
        pass: false,
        message: () => {
          const hint: string = this.utils.matcherHint(
            methodName,
            'transformer',
            'data',
            {comment: 'toLiteral -> literal', isNot, promise},
          );

          const diffString: string =
            diff(literal, newLiteral, {expand}) ?? 'unknown';

          return `${hint}\n\nLiteral difference:\n\n${diffString}`;
        },
      };
    }

    const newValue: T = transformer.fromLiteral(newLiteral);

    if (!this.equals(value, newValue, [], true)) {
      return {
        pass: false,
        message: () => {
          const hint: string = this.utils.matcherHint(
            methodName,
            'transformer',
            'data',
            {comment: 'literal -> fromLiteral', isNot, promise},
          );

          const difference: string =
            diff(value, newValue, {expand}) ?? 'unknown';

          return `${hint}\n\nData difference:\n\n${difference}`;
        },
      };
    }

    return {
      pass: true,
      message: () =>
        this.utils.matcherHint(methodName, 'transformer', 'data', {
          comment: 'toLiteral -> literal -> fromLiteral',
          isNot,
          promise,
        }),
    };
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeTransformation(value: unknown, literal: unknown): R;
    }
  }
}

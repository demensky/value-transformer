import {diff} from 'jest-diff';

import type {ValueTransformer} from '../base/value-transformer';

expect.extend({
  toBeCompactTransformation<T>(
    this: jest.MatcherContext,
    transformer: ValueTransformer<T, T>,
    value: T,
    literal: unknown,
  ): jest.CustomMatcherResult {
    const {isNot, promise, expand} = this;
    const methodName = 'toBeCompactTransformation';
    const secondArgument = 'literal';

    const newLiteral: unknown = transformer.toCompactLiteral(value);

    if (!this.equals(literal, newLiteral, [], true)) {
      return {
        pass: false,
        message: () => {
          const hint: string = this.utils.matcherHint(
            methodName,
            'transformer',
            'data',
            {
              comment: 'toCompactLiteral -> literal',
              isNot,
              promise,
              secondArgument,
            },
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
            {
              comment: 'literal -> fromLiteral',
              isNot,
              promise,
              secondArgument,
            },
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
          comment: 'toCompactLiteral -> literal -> fromLiteral',
          isNot,
          promise,
          secondArgument,
        }),
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCompactTransformation(value: unknown, literal: unknown): R;
    }
  }
}

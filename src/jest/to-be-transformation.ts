import {diff} from 'jest-diff';
import {matcherHint} from 'jest-matcher-utils';

import type {ValueTransformer} from '../base/value-transformer';
import type {ValueTransformerInput} from '../base/value-transformer-input';

function failMessage(
  {isNot, promise, expand}: jest.MatcherContext,
  comment: string,
  expected: unknown,
  received: unknown,
): string {
  const hint = matcherHint(
    'toBeTransformation',
    'transformer',
    'data, literal, compactLiteral',
    {comment, isNot, promise},
  );

  const diffText: string = diff(expected, received, {expand}) ?? 'unknown';

  return `${hint}\n\n${diffText}`;
}

expect.extend({
  toBeTransformation<T>(
    this: jest.MatcherContext,
    transformer: ValueTransformer<T, T>,
    data: T,
    literal: unknown,
    compactLiteral: unknown,
  ): jest.CustomMatcherResult {
    const {isNot, promise} = this;

    const newLiteral: unknown = transformer.toLiteral(data);

    if (!this.equals(literal, newLiteral, [], true)) {
      return {
        pass: false,
        message: () =>
          failMessage(
            this,
            'transformer.toLiteral(data) -> literal',
            literal,
            newLiteral,
          ),
      };
    }

    const newCompactLiteral: unknown = transformer.toCompactLiteral(data);

    if (!this.equals(compactLiteral, newCompactLiteral, [], true)) {
      return {
        pass: false,
        message: () =>
          failMessage(
            this,
            'transformer.toCompactLiteral(data) -> compactLiteral',
            compactLiteral,
            newCompactLiteral,
          ),
      };
    }

    const newData: T = transformer.fromLiteral(literal);

    if (!this.equals(data, newData, [], true)) {
      return {
        pass: false,
        message: () =>
          failMessage(
            this,
            'fromLiteral.fromLiteral(literal) -> data',
            data,
            newData,
          ),
      };
    }

    const newCompactData: T = transformer.fromLiteral(compactLiteral);

    if (!this.equals(data, newCompactData, [], true)) {
      return {
        pass: false,
        message: () =>
          failMessage(
            this,
            'transformer.fromLiteral(compactLiteral) -> data',
            data,
            newCompactData,
          ),
      };
    }

    return {
      pass: true,
      message: () =>
        matcherHint('toBeTransformation', 'transformer', 'data', {
          comment: 'toLiteral -> literal -> fromLiteral',
          isNot,
          promise,
        }),
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeTransformation(
        data: T extends ValueTransformerInput<infer I> ? I : never,
        literal: unknown,
        compactLiteral: unknown,
      ): R;
    }
  }
}

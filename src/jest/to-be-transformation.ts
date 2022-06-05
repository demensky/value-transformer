import {diff} from 'jest-diff';
import {matcherHint} from 'jest-matcher-utils';

import type {ValueTransformer} from '../base/value-transformer.js';
import type {ValueTransformerInput} from '../base/value-transformer-input.js';

function failResult(
  {isNot, promise, expand}: jest.MatcherContext,
  comment: string,
  expected: unknown,
  received: unknown,
): jest.CustomMatcherResult {
  return {
    pass: false,
    message: () => {
      const hint = matcherHint(
        'toBeTransformation',
        'transformer',
        'data, literal, compact',
        {comment, isNot, promise},
      );

      const diffText: string = diff(expected, received, {expand}) ?? 'unknown';

      return `${hint}\n\n${diffText}`;
    },
  };
}

expect.extend({
  toBeTransformation<T>(
    this: jest.MatcherContext,
    transformer: ValueTransformer<T, T>,
    data: T,
    literal: unknown,
    compact: unknown,
  ): jest.CustomMatcherResult {
    const returnerLiteral: unknown = transformer.toLiteral(data);

    if (!this.equals(literal, returnerLiteral, [], true)) {
      const comment = 'transformer.toLiteral(data) -> literal';

      return failResult(this, comment, literal, returnerLiteral);
    }

    const returnerCompact: unknown = transformer.toCompactLiteral(data);

    if (!this.equals(compact, returnerCompact, [], true)) {
      const comment = 'transformer.toCompactLiteral(data) -> compactLiteral';

      return failResult(this, comment, compact, returnerCompact);
    }

    const returnerData: T = transformer.fromLiteral(literal);

    if (!this.equals(data, returnerData, [], true)) {
      const comment = 'transformer.fromLiteral(literal) -> data';

      return failResult(this, comment, data, returnerData);
    }

    const returnerCompactData: T = transformer.fromLiteral(compact);

    if (!this.equals(data, returnerCompactData, [], true)) {
      const comment = 'transformer.fromLiteral(compactLiteral) -> data';

      return failResult(this, comment, data, returnerCompactData);
    }

    return {
      pass: true,
      message: () =>
        matcherHint('toBeTransformation', 'transformer', 'data', this),
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeTransformation(
        data: T extends ValueTransformerInput<infer I> ? I : never,
        literal: unknown,
        compact: unknown,
      ): R;
    }
  }
}

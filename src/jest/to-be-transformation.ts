/* istanbul ignore file */

import {diff} from 'jest-diff';
import {matcherHint} from 'jest-matcher-utils';

import type {ValueTransformer} from '../base/value-transformer';
import type {ValueTransformerInput} from '../base/value-transformer-input';
import {SyncBufferDeserializer} from '../buffer-deserializer/sync-buffer-deserializer';

function concatToUint8(views: ArrayBufferView[]): Uint8Array {
  const result = new Uint8Array(
    views.reduce<number>((previous, {byteLength}) => previous + byteLength, 0),
  );

  let offset = 0;

  for (const {buffer, byteLength, byteOffset} of views) {
    result.set(new Uint8Array(buffer, byteOffset, byteLength), offset);
    offset += byteLength;
  }

  return result;
}

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
        'data, literal, compact, elements',
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
    elements: readonly number[],
  ): jest.CustomMatcherResult {
    const view = new Uint8Array(elements);

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

    const generatedView: Uint8Array = concatToUint8([
      ...transformer.encode(data),
    ]);

    if (!this.equals(view, generatedView, [], true)) {
      const comment = 'transformer.toBufferViews(data) -> views';

      return failResult(this, comment, view, generatedView);
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

    const decodedData: T = SyncBufferDeserializer.from([view]).finalRead(
      transformer.decoder(),
    );

    if (!this.equals(data, decodedData, [], true)) {
      const comment = 'transformer.decoder() -> view decoder generator';

      return failResult(this, comment, data, decodedData);
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
        elements: readonly number[],
      ): R;
    }
  }
}

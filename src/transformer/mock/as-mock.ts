import {MockTransformer} from './mock-transformer';

export function asMock<T>(
  compatibleWith: boolean,
  fromLiteral: T,
  toCompactLiteral: unknown,
  toLiteral: unknown,
  elements: readonly number[],
): MockTransformer<T> {
  return new MockTransformer<T>(
    compatibleWith,
    fromLiteral,
    toCompactLiteral,
    toLiteral,
    new Uint8Array(elements),
  );
}

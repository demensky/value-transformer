import {MockTransformer} from './mock-transformer.js';

export function asMock<T>(
  compatibleWith: boolean,
  fromLiteral: T,
  toCompactLiteral: unknown,
  toLiteral: unknown,
): MockTransformer<T> {
  return new MockTransformer<T>(
    compatibleWith,
    fromLiteral,
    toCompactLiteral,
    toLiteral,
  );
}

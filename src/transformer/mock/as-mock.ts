import {MockTransformer} from './mock-transformer';

export function asMock<I, O extends I>(
  compatibleWith: boolean,
  fromLiteral: O,
  toCompactLiteral: unknown,
  toLiteral: unknown,
): MockTransformer<I, O> {
  return new MockTransformer<I, O>(
    compatibleWith,
    fromLiteral,
    toCompactLiteral,
    toLiteral,
  );
}

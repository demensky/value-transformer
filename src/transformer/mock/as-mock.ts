import {MockTransformer} from './mock-transformer';

export function asMock<I, O extends I>(
  compatibleWith: boolean,
  fromLiteral: O,
  internalDataCanBeVerified: boolean,
  toCompactLiteral: unknown,
  toLiteral: unknown,
): MockTransformer<I, O> {
  return new MockTransformer<I, O>(
    compatibleWith,
    fromLiteral,
    internalDataCanBeVerified,
    toCompactLiteral,
    toLiteral,
  );
}

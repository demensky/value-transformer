import type {IterableEncoding} from '../type/iterable-encoding';

export interface ValueTransformerInput<I> {
  compatibleWith(data: unknown): data is I;

  encode(data: I): IterableEncoding;

  toLiteral(data: I): unknown;

  toCompactLiteral(data: I): unknown;
}

import type {IterableEncoding} from '../type/iterable-encoding.js';

export interface ValueTransformerInput<I> {
  compatibleWith(data: unknown): data is I;

  encode(data: I): IterableEncoding;

  toLiteral(data: I, compact: boolean): unknown;
}

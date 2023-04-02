import type {Encoding} from '../../type/encoding.js';

export interface ValueTransformerInput<I> {
  compatibleWith(data: unknown): data is I;

  encoder(data: I): Encoding;

  toLiteral(data: I, compact: boolean): unknown;
}

import type {Decoding} from '../../type/decoding.js';

export interface ValueTransformerOutput<O> {
  decoder(): Decoding<O>;

  fromLiteral(literal: unknown): O;
}

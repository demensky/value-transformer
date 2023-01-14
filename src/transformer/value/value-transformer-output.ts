import type {DecoderGenerator} from '../../type/decoder-generator.js';

export interface ValueTransformerOutput<O> {
  decoder(): DecoderGenerator<O>;

  fromLiteral(literal: unknown): O;
}

import type {DecoderGenerator} from '../type/decoder-generator';

export interface ValueTransformerOutput<O> {
  decoder(): DecoderGenerator<O>;

  fromLiteral(literal: unknown): O;
}

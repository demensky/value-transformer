import type {DecoderGenerator} from '../../type/decoder-generator.js';

export function* int32Decoder(): DecoderGenerator<number> {
  return (yield Int32Array.BYTES_PER_ELEMENT).getInt32(0, true);
}

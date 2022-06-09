import type {DecoderGenerator} from '../../type/decoder-generator.js';

export function* float64Decoder(): DecoderGenerator<number> {
  return (yield Float64Array.BYTES_PER_ELEMENT).getFloat64(0, true);
}

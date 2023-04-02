import type {Decoding} from '../../type/decoding.js';

export function* float64Decoder(): Decoding<number> {
  return (yield Float64Array.BYTES_PER_ELEMENT).getFloat64(0, true);
}

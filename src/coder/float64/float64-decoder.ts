import {BYTES_PER_FLOAT64} from '../../const/bytes/bytes-per-float64.js';
import type {Decoding} from '../../type/decoding.js';

export function* float64Decoder(): Decoding<number> {
  return (yield BYTES_PER_FLOAT64).getFloat64(0, true);
}

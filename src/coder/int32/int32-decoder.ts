import {BYTES_PER_INT32} from '../../const/bytes/bytes-per-int32.js';
import type {Decoding} from '../../type/decoding.js';

export function* int32Decoder(): Decoding<number> {
  return (yield BYTES_PER_INT32).getInt32(0, true);
}

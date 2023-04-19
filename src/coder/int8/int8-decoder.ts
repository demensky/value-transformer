import {BYTES_PER_INT8} from '../../const/bytes/bytes-per-int8.js';
import type {Decoding} from '../../type/decoding.js';

export function* int8Decoder(): Decoding<number> {
  return (yield BYTES_PER_INT8).getInt8(0);
}

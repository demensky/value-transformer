import {BYTES_PER_INT16} from '../../const/bytes/bytes-per-int16.js';
import type {Decoding} from '../../type/decoding.js';

export function* int16Decoder(): Decoding<number> {
  return (yield BYTES_PER_INT16).getInt16(0, true);
}

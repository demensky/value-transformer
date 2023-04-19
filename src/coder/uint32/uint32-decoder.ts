import {BYTES_PER_UINT32} from '../../const/bytes/bytes-per-uint32.js';
import type {Decoding} from '../../type/decoding.js';

export function* uint32Decoder(): Decoding<number> {
  return (yield BYTES_PER_UINT32).getUint32(0, true);
}

import {BYTES_PER_UINT8} from '../../const/bytes/bytes-per-uint8.js';
import type {Decoding} from '../../type/decoding.js';

export function* uint8Decoder(): Decoding<number> {
  return (yield BYTES_PER_UINT8).getUint8(0);
}

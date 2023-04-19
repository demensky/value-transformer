import {BYTES_PER_UINT16} from '../../const/bytes/bytes-per-uint16.js';
import type {Decoding} from '../../type/decoding.js';

export function* uint16Decoder(): Decoding<number> {
  return (yield BYTES_PER_UINT16).getUint16(0, true);
}

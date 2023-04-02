import type {Decoding} from '../../type/decoding.js';

export function* int8Decoder(): Decoding<number> {
  return (yield Int8Array.BYTES_PER_ELEMENT).getInt8(0);
}

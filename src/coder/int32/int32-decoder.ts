import type {Decoding} from '../../type/decoding.js';

export function* int32Decoder(): Decoding<number> {
  return (yield Int32Array.BYTES_PER_ELEMENT).getInt32(0, true);
}

import type {Decoding} from '../../type/decoding.js';

export function* int16Decoder(): Decoding<number> {
  return (yield Int16Array.BYTES_PER_ELEMENT).getInt16(0, true);
}

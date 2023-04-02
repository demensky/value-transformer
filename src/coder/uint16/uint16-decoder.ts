import type {Decoding} from '../../type/decoding.js';

export function* uint16Decoder(): Decoding<number> {
  return (yield Uint16Array.BYTES_PER_ELEMENT).getUint16(0, true);
}

import type {Decoding} from '../../type/decoding.js';

export function* uint8Decoder(): Decoding<number> {
  return (yield Uint8Array.BYTES_PER_ELEMENT).getUint8(0);
}

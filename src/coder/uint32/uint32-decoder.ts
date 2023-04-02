import type {Decoding} from '../../type/decoding.js';

export function* uint32Decoder(): Decoding<number> {
  return (yield Uint32Array.BYTES_PER_ELEMENT).getUint32(0, true);
}

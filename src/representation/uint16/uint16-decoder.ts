import type {DecoderGenerator} from '../../type/decoder-generator.js';

export function* uint16Decoder(): DecoderGenerator<number> {
  return (yield Uint16Array.BYTES_PER_ELEMENT).getUint16(0, true);
}

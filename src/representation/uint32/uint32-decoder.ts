import type {DecoderGenerator} from '../../type/decoder-generator';

export function* uint32Decoder(): DecoderGenerator<number> {
  return (yield Uint32Array.BYTES_PER_ELEMENT).getUint32(0, true);
}

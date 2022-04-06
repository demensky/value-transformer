import type {DecoderGenerator} from '../../type/decoder-generator';

export function* uint8Decoder(): DecoderGenerator<number> {
  return (yield Uint8Array.BYTES_PER_ELEMENT).getUint8(0);
}

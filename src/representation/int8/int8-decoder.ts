import type {DecoderGenerator} from '../../type/decoder-generator';

export function* int8Decoder(): DecoderGenerator<number> {
  return (yield Int8Array.BYTES_PER_ELEMENT).getInt8(0);
}

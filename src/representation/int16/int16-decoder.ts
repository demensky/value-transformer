import type {DecoderGenerator} from '../../type/decoder-generator';

export function* int16Decoder(): DecoderGenerator<number> {
  return (yield Int16Array.BYTES_PER_ELEMENT).getInt16(0, true);
}

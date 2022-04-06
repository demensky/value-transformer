import type {DecoderGenerator} from '../../type/decoder-generator';
import {stringDecoder} from '../string/string-decoder';

export function* regExpDecoder(): DecoderGenerator<RegExp> {
  return new RegExp(yield* stringDecoder(), yield* stringDecoder());
}

import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {stringDecoder} from '../string/string-decoder.js';

export function* regExpDecoder(): DecoderGenerator<RegExp> {
  return new RegExp(yield* stringDecoder(), yield* stringDecoder());
}

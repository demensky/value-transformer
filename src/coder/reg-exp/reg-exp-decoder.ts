import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {float64Decoder} from '../float64/float64-decoder.js';
import {stringDecoder} from '../string/string-decoder.js';

export function* regExpDecoder(): DecoderGenerator<RegExp> {
  const pattern = yield* stringDecoder();
  const flags = yield* stringDecoder();
  const lastIndex = yield* float64Decoder();

  try {
    const data = new RegExp(pattern, flags);

    data.lastIndex = lastIndex;

    return data;
  } catch (cause) {
    throw new InvalidBufferValueError('', {cause});
  }
}

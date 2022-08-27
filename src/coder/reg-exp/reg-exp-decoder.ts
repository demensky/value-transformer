import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {stringDecoder} from '../string/string-decoder.js';

export function* regExpDecoder(): DecoderGenerator<RegExp> {
  const pattern = yield* stringDecoder();
  const flags = yield* stringDecoder();

  try {
    return new RegExp(pattern, flags);
  } catch (cause) {
    throw new InvalidBufferValueError('', {cause});
  }
}

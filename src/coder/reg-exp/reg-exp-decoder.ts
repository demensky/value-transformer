import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {float64Decoder} from '../float64/float64-decoder.js';
import {stringDecoder} from '../string/string-decoder.js';

export function* regExpDecoder(): DecoderGenerator<RegExp> {
  const source = yield* stringDecoder();
  const flags = yield* stringDecoder();

  let data: RegExp;

  try {
    data = new RegExp(source, flags);
  } catch (cause) {
    throw new InvalidBufferValueError('', {cause});
  }

  if (data.source !== source || data.flags !== flags) {
    throw new InvalidBufferValueError('regex is not symmetrical');
  }

  data.lastIndex = yield* float64Decoder();

  return data;
}

import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {stringDecoder} from '../string/string-decoder.js';

export function* regExpDecoder(): DecoderGenerator<RegExp> {
  const pattern = yield* stringDecoder();
  const flags = yield* stringDecoder();

  try {
    return new RegExp(pattern, flags);
  } catch (cause) {
    // TODO remove "as"
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    throw new InvalidBufferValueError('', {cause} as ErrorOptions);
  }
}

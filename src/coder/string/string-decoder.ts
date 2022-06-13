import {valueTransformerConfig} from '../../base/value-transformer-config.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {uintDecoder} from '../uint/uint-decoder.js';

export function* stringDecoder(): DecoderGenerator<string> {
  const byteLength: number = yield* uintDecoder();

  if (byteLength > valueTransformerConfig.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  try {
    return new TextDecoder('utf-8', {fatal: true}).decode(yield byteLength);
  } catch (cause) {
    throw new InvalidBufferValueError(
      '',
      // TODO remove "as"
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      {cause} as ErrorOptions,
    );
  }
}

import {valueTransformerConfig} from '../../base/value-transformer-config.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {uintDecoder} from '../uint/uint-decoder.js';

export function* stringDecoder(): DecoderGenerator<string> {
  const byteLength: number = yield* uintDecoder();

  if (byteLength > valueTransformerConfig.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  return new TextDecoder('utf-8').decode(yield byteLength);
}

import {valueTransformerConfig} from '../../base/value-transformer-config';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error';
import type {DecoderGenerator} from '../../type/decoder-generator';
import {uintDecoder} from '../uint/uint-decoder';

export function* stringDecoder(): DecoderGenerator<string> {
  const byteLength: number = yield* uintDecoder();

  if (byteLength > valueTransformerConfig.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  return new TextDecoder('utf-8').decode(yield byteLength);
}

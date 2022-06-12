import {valueTransformerConfig} from '../../base/value-transformer-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {uintDecoder} from '../uint/uint-decoder.js';

export function* setDecoder<T>(
  decoder: DecoderGeneratorFactory<T>,
): DecoderGenerator<Set<T>> {
  const length: number = yield* uintDecoder();

  if (length > valueTransformerConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  const result = new Set<T>();

  for (let index = 0; index < length; index++) {
    result.add(yield* decoder());
  }

  return result;
}

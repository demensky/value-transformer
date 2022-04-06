import {valueTransformerConfig} from '../../base/value-transformer-config';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error';
import type {DecoderGenerator} from '../../type/decoder-generator';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory';
import {uintDecoder} from '../uint/uint-decoder';

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

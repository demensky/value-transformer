import {valueTransformerConfig} from '../../base/value-transformer-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {uintDecoder} from '../uint/uint-decoder.js';

export function* mapDecoder<K, V>(
  keyDecoder: DecoderGeneratorFactory<K>,
  valueDecoder: DecoderGeneratorFactory<V>,
): DecoderGenerator<Map<K, V>> {
  const size: number = yield* uintDecoder();

  if (size > valueTransformerConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  const result = new Map<K, V>();

  for (let index = 0; index < size; index++) {
    result.set(yield* keyDecoder(), yield* valueDecoder());
  }

  return result;
}

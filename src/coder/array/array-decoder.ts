import {config} from '../../base/config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {uintDecoder} from '../uint/uint-decoder.js';

export function* arrayDecoder<T>(
  decoder: DecoderGeneratorFactory<T>,
): DecoderGenerator<T[]> {
  const length: number = yield* uintDecoder();

  if (length > config.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  const result: T[] = [];

  for (let index = 0; index < length; index++) {
    result.push(yield* decoder());
  }

  return result;
}

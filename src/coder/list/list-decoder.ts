import {config} from '../../base/config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {uintDecoder} from '../uint/uint-decoder.js';

import type {ListAppend} from './list-append.js';

export function* listDecoder<T, C>(
  collection: C,
  decoder: DecoderGeneratorFactory<T>,
  append: ListAppend<T, C>,
): DecoderGenerator<C> {
  const size: number = yield* uintDecoder();

  if (size > config.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  for (let index = 0; index < size; index++) {
    append(collection, yield* decoder());
  }

  return collection;
}

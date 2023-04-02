import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Decoder} from '../../type/decoder.js';
import type {Decoding} from '../../type/decoding.js';
import {uintDecoder} from '../uint/uint-decoder.js';

import type {ListAppend} from './list-append.js';

export function* listDecoder<T, C>(
  collection: C,
  decoder: Decoder<T>,
  append: ListAppend<T, C>,
): Decoding<C> {
  const size: number = yield* uintDecoder();

  if (size > coderConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  for (let index = 0; index < size; index++) {
    append(collection, yield* decoder());
  }

  return collection;
}

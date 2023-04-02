import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Decoder} from '../../type/decoder.js';
import type {Decoding} from '../../type/decoding.js';
import {uintDecoder} from '../uint/uint-decoder.js';

import type {DictionaryAppend} from './dictionary-append.js';

export function* dictionaryDecoder<K, V, D>(
  dictionary: D,
  keyDecoder: Decoder<K>,
  valueDecoder: Decoder<V>,
  append: DictionaryAppend<K, V, D>,
): Decoding<D> {
  const size: number = yield* uintDecoder();

  if (size > coderConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  for (let index = 0; index < size; index++) {
    append(dictionary, yield* keyDecoder(), yield* valueDecoder());
  }

  return dictionary;
}

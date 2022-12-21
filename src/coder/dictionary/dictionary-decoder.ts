import {config} from '../../base/config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {uintDecoder} from '../uint/uint-decoder.js';

import type {DictionaryAppend} from './dictionary-append.js';

export function* dictionaryDecoder<K, V, D>(
  dictionary: D,
  keyDecoder: DecoderGeneratorFactory<K>,
  valueDecoder: DecoderGeneratorFactory<V>,
  append: DictionaryAppend<K, V, D>,
): DecoderGenerator<D> {
  const size: number = yield* uintDecoder();

  if (size > config.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  for (let index = 0; index < size; index++) {
    append(dictionary, yield* keyDecoder(), yield* valueDecoder());
  }

  return dictionary;
}

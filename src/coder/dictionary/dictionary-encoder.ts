import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import type {SizeExtractor} from '../../type/size-extractor.js';
import {uintEncoder} from '../uint/uint-encoder.js';

export function* dictionaryEncoder<K, V, D extends Iterable<readonly [K, V]>>(
  dictionary: D,
  extractSize: SizeExtractor<D>,
  keyEncoder: Encoder<K>,
  valueEncoder: Encoder<V>,
): Encoding {
  const size: number = extractSize(dictionary);

  if (size > coderConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncoder(size);

  let count = 0;

  for (const [key, value] of dictionary) {
    yield* keyEncoder(key);
    yield* valueEncoder(value);
    count++;
  }

  if (size !== count) {
    throw new RangeError('Dictionary size has been changed');
  }
}

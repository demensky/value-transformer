import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {uintEncode} from '../uint/uint-encode.js';

export function* dictionaryEncode<K, V>(
  dictionary: Iterable<readonly [K, V]>,
  size: number,
  keyEncoder: EncodeFactory<K>,
  valueEncoder: EncodeFactory<V>,
): IterableEncoding {
  if (size > coderConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncode(size);

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

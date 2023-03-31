import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {uintEncode} from '../uint/uint-encode.js';

export function* dictionaryEncode<K, V>(
  dictionary: Iterable<readonly [K, V]>,
  size: number,
  keyEncoder: Encoder<K>,
  valueEncoder: Encoder<V>,
): Encoding {
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

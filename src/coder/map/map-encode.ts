import {config} from '../../base/config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {uintEncode} from '../uint/uint-encode.js';

export function* mapEncode<K, V>(
  map: ReadonlyMap<K, V>,
  keyEncoder: EncodeFactory<K>,
  valueEncoder: EncodeFactory<V>,
): IterableEncoding {
  if (map.size > config.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncode(map.size);

  for (const [key, value] of map) {
    yield* keyEncoder(key);
    yield* valueEncoder(value);
  }
}

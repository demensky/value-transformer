import {valueTransformerConfig} from '../../base/value-transformer-config';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error';
import type {EncodeFactory} from '../../type/encode-factory';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {uintEncode} from '../uint/uint-encode';

export function* mapEncode<K, V>(
  map: ReadonlyMap<K, V>,
  keyEncoder: EncodeFactory<K>,
  valueEncoder: EncodeFactory<V>,
): IterableEncoding {
  if (map.size > valueTransformerConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncode(map.size);

  for (const [key, value] of map) {
    yield* keyEncoder(key);
    yield* valueEncoder(value);
  }
}

import {config} from '../../base/config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {uintEncode} from '../uint/uint-encode.js';

export function* arrayEncode<T>(
  array: readonly T[],
  encoder: EncodeFactory<T>,
): IterableEncoding {
  if (array.length > config.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncode(array.length);

  for (const item of array) {
    yield* encoder(item);
  }
}

import {config} from '../../base/config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {uintEncode} from '../uint/uint-encode.js';

export function* listEncode<T>(
  collection: Iterable<T>,
  size: number,
  encoder: EncodeFactory<T>,
): IterableEncoding {
  if (size > config.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncode(size);

  let count = 0;

  for (const item of collection) {
    yield* encoder(item);
    count++;
  }

  if (size !== count) {
    throw new RangeError('List size has been changed');
  }
}

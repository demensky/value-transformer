import {config} from '../../base/config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {uintEncode} from '../uint/uint-encode.js';

export function* setEncode<T>(
  set: ReadonlySet<T>,
  encoder: EncodeFactory<T>,
): IterableEncoding {
  if (set.size > config.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncode(set.size);

  for (const item of set) {
    yield* encoder(item);
  }
}

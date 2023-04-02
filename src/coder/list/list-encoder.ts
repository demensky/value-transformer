import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {uintEncoder} from '../uint/uint-encoder.js';

export function* listEncoder<T>(
  collection: Iterable<T>,
  size: number,
  encoder: Encoder<T>,
): Encoding {
  if (size > coderConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncoder(size);

  let count = 0;

  for (const item of collection) {
    yield* encoder(item);
    count++;
  }

  if (size !== count) {
    throw new RangeError('List size has been changed');
  }
}

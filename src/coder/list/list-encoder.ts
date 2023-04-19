import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import type {SizeExtractor} from '../../type/size-extractor.js';
import {uintEncoder} from '../uint/uint-encoder.js';

export function* listEncoder<T, L extends Iterable<T>>(
  list: L,
  extractSize: SizeExtractor<L>,
  encoder: Encoder<T>,
): Encoding {
  const size: number = extractSize(list);

  if (size > coderConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncoder(size);

  let count = 0;

  for (const item of list) {
    yield* encoder(item);
    count++;
  }

  if (size !== count) {
    throw new RangeError('List size has been changed');
  }
}

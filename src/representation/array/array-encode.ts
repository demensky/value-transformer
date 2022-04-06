import {valueTransformerConfig} from '../../base/value-transformer-config';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error';
import type {EncodeFactory} from '../../type/encode-factory';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {uintEncode} from '../uint/uint-encode';

export function* arrayEncode<T>(
  array: readonly T[],
  encoder: EncodeFactory<T>,
): IterableEncoding {
  if (array.length > valueTransformerConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncode(array.length);

  for (const item of array) {
    yield* encoder(item);
  }
}

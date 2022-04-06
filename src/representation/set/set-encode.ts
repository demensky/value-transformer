import {valueTransformerConfig} from '../../base/value-transformer-config';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error';
import type {EncodeFactory} from '../../type/encode-factory';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {uintEncode} from '../uint/uint-encode';

export function* setEncode<T>(
  set: ReadonlySet<T>,
  encoder: EncodeFactory<T>,
): IterableEncoding {
  if (set.size > valueTransformerConfig.collectionMaxLength) {
    throw new OutOfMaxLengthError();
  }

  yield* uintEncode(set.size);

  for (const item of set) {
    yield* encoder(item);
  }
}

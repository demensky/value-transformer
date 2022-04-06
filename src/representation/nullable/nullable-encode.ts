import type {EncodeFactory} from '../../type/encode-factory';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {booleanEncode} from '../boolean/boolean-encode';

export function* nullableEncode<T>(
  value: T | null,
  encoder: EncodeFactory<T>,
): IterableEncoding {
  if (value === null) {
    yield* booleanEncode(false);

    return;
  }

  yield* booleanEncode(true);
  yield* encoder(value);
}

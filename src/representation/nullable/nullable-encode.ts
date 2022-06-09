import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {booleanEncode} from '../boolean/boolean-encode.js';

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

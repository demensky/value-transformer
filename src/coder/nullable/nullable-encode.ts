import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {booleanEncode} from '../boolean/boolean-encode.js';

export function* nullableEncode<T>(
  value: T | null,
  encoder: Encoder<T>,
): Encoding {
  if (value === null) {
    yield* booleanEncode(false);

    return;
  }

  yield* booleanEncode(true);
  yield* encoder(value);
}

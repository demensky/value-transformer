import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {booleanEncoder} from '../boolean/boolean-encoder.js';

export function* nullableEncoder<T>(
  value: T | null,
  encoder: Encoder<T>,
): Encoding {
  if (value === null) {
    yield* booleanEncoder(false);

    return;
  }

  yield* booleanEncoder(true);
  yield* encoder(value);
}

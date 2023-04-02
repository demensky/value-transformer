import type {Encoding} from '../../type/encoding.js';
import {float64Encoder} from '../float64/float64-encoder.js';
import {stringEncoder} from '../string/string-encoder.js';

export function* regExpEncoder({source, flags, lastIndex}: RegExp): Encoding {
  yield* stringEncoder(source);
  yield* stringEncoder(flags);
  yield* float64Encoder(lastIndex);
}

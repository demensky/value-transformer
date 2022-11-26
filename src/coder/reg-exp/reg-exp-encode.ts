import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {float64Encode} from '../float64/float64-encode.js';
import {stringEncode} from '../string/string-encode.js';

export function* regExpEncode({
  source,
  flags,
  lastIndex,
}: RegExp): IterableEncoding {
  yield* stringEncode(source);
  yield* stringEncode(flags);
  yield* float64Encode(lastIndex);
}

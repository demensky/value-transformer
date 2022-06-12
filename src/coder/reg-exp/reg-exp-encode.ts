import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {stringEncode} from '../string/string-encode.js';

export function* regExpEncode({source, flags}: RegExp): IterableEncoding {
  yield* stringEncode(source);
  yield* stringEncode(flags);
}

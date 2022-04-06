import type {IterableEncoding} from '../../type/iterable-encoding';
import {stringEncode} from '../string/string-encode';

export function* regExpEncode({source, flags}: RegExp): IterableEncoding {
  yield* stringEncode(source);
  yield* stringEncode(flags);
}

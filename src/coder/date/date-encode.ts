import type {IterableEncoding} from '../../type/iterable-encoding.js';
import type {ReadonlyDate} from '../../type/readonly-date.js';
import {float64Encode} from '../float64/float64-encode.js';

export function dateEncode(value: ReadonlyDate): IterableEncoding {
  return float64Encode(value.getTime());
}

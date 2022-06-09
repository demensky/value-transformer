import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {float64Encode} from '../float64/float64-encode.js';

export function dateEncode(value: Date): IterableEncoding {
  return float64Encode(value.getTime());
}

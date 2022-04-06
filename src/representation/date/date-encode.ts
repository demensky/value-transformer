import type {IterableEncoding} from '../../type/iterable-encoding';
import {float64Encode} from '../float64/float64-encode';

export function dateEncode(value: Date): IterableEncoding {
  return float64Encode(value.getTime());
}

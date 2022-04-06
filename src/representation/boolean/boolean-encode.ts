import {FALSE_OCTET} from '../../const/false-octet';
import {TRUE_OCTET} from '../../const/true-octet';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {uint8Encode} from '../uint8/uint8-encode';

export function booleanEncode(value: boolean): IterableEncoding {
  return uint8Encode(value ? TRUE_OCTET : FALSE_OCTET);
}

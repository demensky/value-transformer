import {FALSE_OCTET} from '../../const/false-octet.js';
import {TRUE_OCTET} from '../../const/true-octet.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {uint8Encode} from '../uint8/uint8-encode.js';

export function booleanEncode(value: boolean): IterableEncoding {
  return uint8Encode(value ? TRUE_OCTET : FALSE_OCTET);
}

import {FALSE_OCTET} from '../../const/false-octet.js';
import {TRUE_OCTET} from '../../const/true-octet.js';
import type {Encoding} from '../../type/encoding.js';
import {uint8Encoder} from '../uint8/uint8-encoder.js';

export function booleanEncoder(value: boolean): Encoding {
  return uint8Encoder(value ? TRUE_OCTET : FALSE_OCTET);
}

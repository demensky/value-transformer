import {FALSE_OCTET} from '../../const/false-octet.js';
import {TRUE_OCTET} from '../../const/true-octet.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {Decoding} from '../../type/decoding.js';
import {uint8Decoder} from '../uint8/uint8-decoder.js';

export function* booleanDecoder(): Decoding<boolean> {
  const value: number = yield* uint8Decoder();

  switch (value) {
    case FALSE_OCTET:
      return false;
    case TRUE_OCTET:
      return true;
    default:
      throw new InvalidBufferValueError();
  }
}

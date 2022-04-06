import {FALSE_OCTET} from '../../const/false-octet';
import {TRUE_OCTET} from '../../const/true-octet';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error';
import type {DecoderGenerator} from '../../type/decoder-generator';
import {uint8Decoder} from '../uint8/uint8-decoder';

export function* booleanDecoder(): DecoderGenerator<boolean> {
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

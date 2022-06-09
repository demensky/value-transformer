import {AMOUNT_IN_SEVEN_BIT} from '../../const/amount-in-seven-bit.js';
import {SEVEN_BIT_PAYLOAD} from '../../const/seven-bit-data.js';
import {USE_NEXT_BYTE} from '../../const/use-next-byte.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {uint8Decoder} from '../uint8/uint8-decoder.js';

export function* uintDecoder(): DecoderGenerator<number> {
  let result = 0;
  let index = 0;

  let part: number;

  do {
    part = yield* uint8Decoder();
    result += (part & SEVEN_BIT_PAYLOAD) * AMOUNT_IN_SEVEN_BIT ** index++;

    if (result > Number.MAX_SAFE_INTEGER) {
      throw new OutOfMaxLengthError();
    }
  } while ((part & USE_NEXT_BYTE) !== 0);

  return result;
}

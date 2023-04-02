import {AMOUNT_IN_SEVEN_BIT} from '../../const/amount-in-seven-bit.js';
import {SEVEN_BIT_PAYLOAD} from '../../const/seven-bit-data.js';
import {USE_NEXT_BYTE} from '../../const/use-next-byte.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Decoding} from '../../type/decoding.js';
import {uint8Decoder} from '../uint8/uint8-decoder.js';

export function* uintDecoder(): Decoding<number> {
  let part: number = yield* uint8Decoder();
  let result: number = part & SEVEN_BIT_PAYLOAD;

  for (let index = 1; (part & USE_NEXT_BYTE) !== 0; index++) {
    part = yield* uint8Decoder();
    result += ((part & SEVEN_BIT_PAYLOAD) + 1) * AMOUNT_IN_SEVEN_BIT ** index;

    if (result > Number.MAX_SAFE_INTEGER) {
      throw new OutOfMaxLengthError();
    }
  }

  return result;
}

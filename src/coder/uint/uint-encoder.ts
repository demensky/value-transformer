import {AMOUNT_IN_SEVEN_BIT} from '../../const/amount-in-seven-bit.js';
import {SEVEN_BIT_PAYLOAD} from '../../const/seven-bit-data.js';
import {USE_NEXT_BYTE} from '../../const/use-next-byte.js';
import type {Encoding} from '../../type/encoding.js';
import {isSafeUint} from '../../util/guard/is-safe-uint.js';
import {uint8Encoder} from '../uint8/uint8-encoder.js';

export function* uintEncoder(value: number): Encoding {
  console.assert(isSafeUint(value));

  let current: number = value;

  while (current >= AMOUNT_IN_SEVEN_BIT) {
    const element: number = current & SEVEN_BIT_PAYLOAD;

    yield* uint8Encoder(element | USE_NEXT_BYTE);
    current = (current - AMOUNT_IN_SEVEN_BIT - element) / AMOUNT_IN_SEVEN_BIT;
  }

  yield* uint8Encoder(current);
}

import {AMOUNT_IN_SEVEN_BIT} from '../../const/amount-in-seven-bit.js';
import {SEVEN_BIT_PAYLOAD} from '../../const/seven-bit-data.js';
import {USE_NEXT_BYTE} from '../../const/use-next-byte.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isSafeUint} from '../../util/guard/is-safe-uint.js';

export function* uintEncode(value: number): IterableEncoding {
  console.assert(isSafeUint(value));

  const elements: number[] = [];
  let current: number = value;

  while (current >= AMOUNT_IN_SEVEN_BIT) {
    const element: number = current & SEVEN_BIT_PAYLOAD;

    elements.push(element | USE_NEXT_BYTE);
    current = (current - AMOUNT_IN_SEVEN_BIT - element) / AMOUNT_IN_SEVEN_BIT;
  }

  elements.push(current);

  yield new Uint8Array(elements);
}

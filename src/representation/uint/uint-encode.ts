import {AMOUNT_IN_SEVEN_BIT} from '../../const/amount-in-seven-bit';
import {SEVEN_BIT_PAYLOAD} from '../../const/seven-bit-data';
import {USE_NEXT_BYTE} from '../../const/use-next-byte';
import type {IterableEncoding} from '../../type/iterable-encoding';

export function* uintEncode(value: number): IterableEncoding {
  console.assert(Number.isSafeInteger(value) && value >= 0);

  const elements: number[] = [];
  let current: number = value;

  while (current >= AMOUNT_IN_SEVEN_BIT) {
    const element: number = current & SEVEN_BIT_PAYLOAD;

    elements.push(element | USE_NEXT_BYTE);
    current = (current - element) / AMOUNT_IN_SEVEN_BIT;
  }

  elements.push(current);

  yield new Uint8Array(elements);
}

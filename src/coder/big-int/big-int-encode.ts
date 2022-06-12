/* eslint-disable @typescript-eslint/no-magic-numbers */

import {valueTransformerConfig} from '../../base/value-transformer-config.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';

export function* bigIntEncode(value: bigint): IterableEncoding {
  const elements: number[] = [];
  let current: bigint = value;

  while (current >= 64 || current < -64) {
    const element: bigint = BigInt.asUintN(7, current);

    elements.push(Number(element) | 0b10000000);
    current = current >> 7n;

    if (elements.length - 1 > valueTransformerConfig.bitIntMaxByteLength) {
      throw new OutOfMaxByteLengthError();
    }
  }

  elements.push(Number(BigInt.asUintN(7, current)));

  yield new Uint8Array(elements);
}

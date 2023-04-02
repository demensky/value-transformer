/* eslint-disable @typescript-eslint/no-magic-numbers */

import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {Encoding} from '../../type/encoding.js';
import {uint8Encoder} from '../uint8/uint8-encoder.js';

export function* bigIntEncoder(value: bigint): Encoding {
  let elements = 0;
  let current: bigint = value;

  while (current >= 64 || current < -64) {
    const element: bigint = BigInt.asUintN(7, current);

    yield* uint8Encoder(Number(element) | 0b10000000);
    elements++;
    current = current >> 7n;

    if (elements - 1 > coderConfig.bitIntMaxByteLength) {
      throw new OutOfMaxByteLengthError();
    }
  }

  yield* uint8Encoder(Number(BigInt.asUintN(7, current)));
}

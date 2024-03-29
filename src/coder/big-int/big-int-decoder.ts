/* eslint-disable @typescript-eslint/no-magic-numbers */

import {coderConfig} from '../../config/coder-config.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {Decoding} from '../../type/decoding.js';
import {uint8Decoder} from '../uint8/uint8-decoder.js';

export function* bigIntDecoder(): Decoding<bigint> {
  let result = 0n;

  let part: bigint;
  let byteOffset = 0n;

  do {
    part = BigInt(yield* uint8Decoder());
    result |= (part & 0b0_1111111n) << (7n * byteOffset++);

    if (byteOffset > coderConfig.bitIntMaxByteLength) {
      throw new OutOfMaxByteLengthError();
    }
  } while (part >> 7n === 1n);

  return BigInt.asIntN(7 * Number(byteOffset), result);
}

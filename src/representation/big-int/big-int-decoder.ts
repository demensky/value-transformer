/* eslint-disable @typescript-eslint/no-magic-numbers */

import {valueTransformerConfig} from '../../base/value-transformer-config';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error';
import type {DecoderGenerator} from '../../type/decoder-generator';
import {uint8Decoder} from '../uint8/uint8-decoder';

export function* bigIntDecoder(): DecoderGenerator<bigint> {
  let result = 0n;

  let part: bigint;
  let byteOffset = 0n;

  do {
    part = BigInt(yield* uint8Decoder());
    result |= (part & 0b0_1111111n) << (7n * byteOffset++);

    if (byteOffset > valueTransformerConfig.bitIntMaxByteLength) {
      throw new OutOfMaxByteLengthError();
    }
  } while (part >> 7n === 1n);

  return BigInt.asIntN(7 * Number(byteOffset), result);
}

/* eslint-disable @typescript-eslint/no-magic-numbers */

import {coderConfig} from '../../config/coder-config.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {Encoding} from '../../type/encoding.js';
import {getStringSizeInBytes} from '../../util/get-string-size-in-bytes.js';
import {isUtf8} from '../../util/guard/is-utf8.js';
import {uintEncoder} from '../uint/uint-encoder.js';

export function* stringEncoder(value: string): Encoding {
  if (!isUtf8(value)) {
    throw new InvalidUnicodeError();
  }

  let part: string = value;
  const encoder = new TextEncoder();

  const byteLength: number = getStringSizeInBytes(value);

  if (byteLength > coderConfig.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  yield* uintEncoder(byteLength);

  while (part.length > 0) {
    (yield -2).setInto((dest) => {
      const result = encoder.encodeInto(part, dest);

      part = part.slice(result.read ?? 0);

      return result.written ?? 0;
    });
  }
}

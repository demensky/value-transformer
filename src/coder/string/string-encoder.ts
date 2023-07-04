/* eslint-disable @typescript-eslint/no-magic-numbers */

import {coderConfig} from '../../config/coder-config.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {Encoding} from '../../type/encoding.js';
import {isWellFormed} from '../../util/is-well-formed.js';
import {utf8ByteLength} from '../../util/utf8-byte-length.js';
import {uintEncoder} from '../uint/uint-encoder.js';

export function* stringEncoder(value: string): Encoding {
  if (!isWellFormed(value)) {
    throw new InvalidUnicodeError();
  }

  let part: string = value;
  const encoder = new TextEncoder();

  const byteLength: number = utf8ByteLength(value);

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

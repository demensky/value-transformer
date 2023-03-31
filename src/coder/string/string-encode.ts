/* eslint-disable @typescript-eslint/no-magic-numbers */

import {coderConfig} from '../../config/coder-config.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {Encoding} from '../../type/encoding.js';
import {isUtf8} from '../../util/guard/is-utf8.js';
import {uintEncode} from '../uint/uint-encode.js';

// https://stackoverflow.com/a/39488643
// TODO test
function fastBytesInString(value: string): number {
  let bytes = 0;

  for (let index = 0; index < value.length; index++) {
    const codePoint = value.charCodeAt(index);

    if (codePoint >= 0xd800 && codePoint < 0xe000) {
      if (codePoint < 0xdc00 && index + 1 < length) {
        const next = value.charCodeAt(index + 1);

        if (next >= 0xdc00 && next < 0xe000) {
          bytes += 4;
          index++;
          continue;
        }
      }
    }

    bytes += codePoint < 0x80 ? 1 : codePoint < 0x800 ? 2 : 3;
  }

  return bytes;
}

export function* stringEncode(value: string): Encoding {
  if (!isUtf8(value)) {
    throw new InvalidUnicodeError();
  }

  let part: string = value;
  const encoder = new TextEncoder();

  const byteLength: number = fastBytesInString(value);

  if (byteLength > coderConfig.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  yield* uintEncode(fastBytesInString(value)); // TODO length

  while (part.length > 0) {
    (yield -2).setInto((dest) => {
      const result = encoder.encodeInto(part, dest);

      part = part.slice(result.read ?? 0);

      return result.written ?? 0;
    });
  }
}

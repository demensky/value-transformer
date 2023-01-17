import {coderConfig} from '../../config/coder-config.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isUtf8} from '../../util/guard/is-utf8.js';
import {uintEncode} from '../uint/uint-encode.js';

export function* stringEncode(value: string): IterableEncoding {
  if (!isUtf8(value)) {
    throw new InvalidUnicodeError();
  }

  const stringBuffer: Uint8Array = new TextEncoder().encode(value);

  if (stringBuffer.byteLength > coderConfig.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  yield* uintEncode(stringBuffer.byteLength);
  yield stringBuffer;
}

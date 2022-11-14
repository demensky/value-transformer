import {config} from '../../base/config.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isValidUnicode} from '../../util/guard/is-valid-unicode.js';
import {uintEncode} from '../uint/uint-encode.js';

export function* stringEncode(value: string): IterableEncoding {
  if (!isValidUnicode(value)) {
    throw new InvalidUnicodeError();
  }

  const stringBuffer: Uint8Array = new TextEncoder().encode(value);

  if (stringBuffer.byteLength > config.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  yield* uintEncode(stringBuffer.byteLength);
  yield stringBuffer;
}

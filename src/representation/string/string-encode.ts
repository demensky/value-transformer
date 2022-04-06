import {valueTransformerConfig} from '../../base/value-transformer-config';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {isValidUnicode} from '../../util/guard/is-valid-unicode';
import {uintEncode} from '../uint/uint-encode';

export function* stringEncode(value: string): IterableEncoding {
  if (!isValidUnicode(value)) {
    throw new InvalidUnicodeError();
  }

  const stringBuffer: Uint8Array = new TextEncoder().encode(value);

  if (stringBuffer.byteLength > valueTransformerConfig.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  yield* uintEncode(stringBuffer.byteLength);
  yield stringBuffer;
}

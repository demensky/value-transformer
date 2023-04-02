import {coderConfig} from '../../config/coder-config.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {Decoding} from '../../type/decoding.js';
import {uintDecoder} from '../uint/uint-decoder.js';

export function* stringDecoder(): Decoding<string> {
  const byteLength: number = yield* uintDecoder();

  if (byteLength > coderConfig.stringMaxByteLength) {
    throw new OutOfMaxByteLengthError();
  }

  try {
    return new TextDecoder('utf-8', {fatal: true}).decode(yield byteLength);
  } catch (cause) {
    throw new InvalidBufferValueError('', {cause});
  }
}

import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {Decoding} from '../../type/decoding.js';
import {float64Decoder} from '../float64/float64-decoder.js';

export function* dateDecoder(): Decoding<Date> {
  const time: number = yield* float64Decoder();
  const result = new Date(time);

  if (!Object.is(result.getTime(), time)) {
    throw new InvalidBufferValueError();
  }

  return result;
}

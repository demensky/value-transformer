import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error';
import type {DecoderGenerator} from '../../type/decoder-generator';
import {float64Decoder} from '../float64/float64-decoder';

export function* dateDecoder(): DecoderGenerator<Date> {
  const time: number = yield* float64Decoder();
  const result = new Date(time);

  if (!Object.is(result.getTime(), time)) {
    throw new InvalidBufferValueError();
  }

  return result;
}

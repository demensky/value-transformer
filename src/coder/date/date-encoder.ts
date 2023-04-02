import type {Encoding} from '../../type/encoding.js';
import type {ReadonlyDate} from '../../type/readonly-date.js';
import {float64Encoder} from '../float64/float64-encoder.js';

export function dateEncoder(value: ReadonlyDate): Encoding {
  return float64Encoder(value.getTime());
}

import {BYTES_PER_FLOAT64} from '../../const/bytes/bytes-per-float64.js';
import type {Encoding} from '../../type/encoding.js';

export function* float64Encoder(value: number): Encoding {
  (yield BYTES_PER_FLOAT64).setView((view, offset) => {
    view.setFloat64(offset, value, true);
  });
}

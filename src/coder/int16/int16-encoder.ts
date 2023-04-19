import {BYTES_PER_INT16} from '../../const/bytes/bytes-per-int16.js';
import type {Encoding} from '../../type/encoding.js';
import {isInt16} from '../../util/guard/is-int16.js';

export function* int16Encoder(value: number): Encoding {
  console.assert(isInt16(value));

  (yield BYTES_PER_INT16).setView((view, offset) => {
    view.setInt16(offset, value, true);
  });
}

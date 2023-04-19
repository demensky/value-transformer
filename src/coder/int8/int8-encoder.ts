import {BYTES_PER_INT8} from '../../const/bytes/bytes-per-int8.js';
import type {Encoding} from '../../type/encoding.js';
import {isInt8} from '../../util/guard/is-int8.js';

export function* int8Encoder(value: number): Encoding {
  console.assert(isInt8(value));

  (yield BYTES_PER_INT8).setView((view, offset) => {
    view.setInt8(offset, value);
  });
}

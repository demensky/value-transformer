import {BYTES_PER_INT32} from '../../const/bytes/bytes-per-int32.js';
import type {Encoding} from '../../type/encoding.js';
import {isInt32} from '../../util/guard/is-int32.js';

export function* int32Encoder(value: number): Encoding {
  console.assert(isInt32(value));

  (yield BYTES_PER_INT32).setView((view, offset) => {
    view.setInt32(offset, value, true);
  });
}

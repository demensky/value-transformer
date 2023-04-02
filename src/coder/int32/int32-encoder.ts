import type {Encoding} from '../../type/encoding.js';
import {isInt32} from '../../util/guard/is-int32.js';

export function* int32Encoder(value: number): Encoding {
  console.assert(isInt32(value));

  (yield Int32Array.BYTES_PER_ELEMENT).setView((view, offset) => {
    view.setInt32(offset, value, true);
  });
}

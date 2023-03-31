import type {Encoding} from '../../type/encoding.js';
import {isInt8} from '../../util/guard/is-int8.js';

export function* int8Encode(value: number): Encoding {
  console.assert(isInt8(value));

  (yield Int8Array.BYTES_PER_ELEMENT).setView((view, offset) => {
    view.setInt8(offset, value);
  });
}

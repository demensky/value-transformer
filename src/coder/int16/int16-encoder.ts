import type {Encoding} from '../../type/encoding.js';
import {isInt16} from '../../util/guard/is-int16.js';

export function* int16Encoder(value: number): Encoding {
  console.assert(isInt16(value));

  (yield Int16Array.BYTES_PER_ELEMENT).setView((view, offset) => {
    view.setInt16(offset, value, true);
  });
}

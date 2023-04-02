import type {Encoding} from '../../type/encoding.js';
import {isUint16} from '../../util/guard/is-uint16.js';

export function* uint16Encoder(value: number): Encoding {
  console.assert(isUint16(value));

  (yield Uint16Array.BYTES_PER_ELEMENT).setView((view, offset) => {
    view.setUint16(offset, value, true);
  });
}

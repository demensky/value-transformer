import type {Encoding} from '../../type/encoding.js';
import {isUint32} from '../../util/guard/is-uint32.js';

export function* uint32Encode(value: number): Encoding {
  console.assert(isUint32(value));

  (yield Uint32Array.BYTES_PER_ELEMENT).setView((view, offset) => {
    view.setUint32(offset, value, true);
  });
}

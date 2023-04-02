import type {Encoding} from '../../type/encoding.js';
import {isUint8} from '../../util/guard/is-uint8.js';

export function* uint8Encoder(value: number): Encoding {
  console.assert(isUint8(value));

  (yield Uint8Array.BYTES_PER_ELEMENT).setView((view, offset) => {
    view.setUint8(offset, value);
  });
}

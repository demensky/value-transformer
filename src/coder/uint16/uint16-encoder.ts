import {BYTES_PER_UINT16} from '../../const/bytes/bytes-per-uint16.js';
import type {Encoding} from '../../type/encoding.js';
import {isUint16} from '../../util/guard/is-uint16.js';

export function* uint16Encoder(value: number): Encoding {
  console.assert(isUint16(value));

  (yield BYTES_PER_UINT16).setView((view, offset) => {
    view.setUint16(offset, value, true);
  });
}

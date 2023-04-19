import {BYTES_PER_UINT8} from '../../const/bytes/bytes-per-uint8.js';
import type {Encoding} from '../../type/encoding.js';
import {isUint8} from '../../util/guard/is-uint8.js';

export function* uint8Encoder(value: number): Encoding {
  console.assert(isUint8(value));

  (yield BYTES_PER_UINT8).setView((view, offset) => {
    view.setUint8(offset, value);
  });
}

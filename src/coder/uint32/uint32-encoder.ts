import {BYTES_PER_UINT32} from '../../const/bytes/bytes-per-uint32.js';
import type {Encoding} from '../../type/encoding.js';
import {isUint32} from '../../util/guard/is-uint32.js';

export function* uint32Encoder(value: number): Encoding {
  console.assert(isUint32(value));

  (yield BYTES_PER_UINT32).setView((view, offset) => {
    view.setUint32(offset, value, true);
  });
}

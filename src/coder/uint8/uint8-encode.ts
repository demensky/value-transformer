import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isUint8} from '../../util/guard/is-uint8.js';

export function* uint8Encode(value: number): IterableEncoding {
  console.assert(isUint8(value));

  yield new Uint8Array([value]);
}

import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isUint16} from '../../util/guard/is-uint16.js';

export function* uint16Encode(value: number): IterableEncoding {
  console.assert(isUint16(value));

  yield new Uint16Array([value]);
}

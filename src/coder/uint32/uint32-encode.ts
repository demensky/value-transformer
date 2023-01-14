import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isUint32} from '../../util/guard/is-uint32.js';

export function* uint32Encode(value: number): IterableEncoding {
  console.assert(isUint32(value));

  yield new Uint32Array([value]);
}

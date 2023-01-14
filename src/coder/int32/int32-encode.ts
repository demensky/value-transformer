import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isInt32} from '../../util/guard/is-int32.js';

export function* int32Encode(value: number): IterableEncoding {
  console.assert(isInt32(value));

  yield new Int32Array([value]);
}

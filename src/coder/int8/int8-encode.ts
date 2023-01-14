import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isInt8} from '../../util/guard/is-int8.js';

export function* int8Encode(value: number): IterableEncoding {
  console.assert(isInt8(value));

  yield new Int8Array([value]);
}

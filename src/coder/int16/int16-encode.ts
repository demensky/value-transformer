import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isInt16} from '../../util/guard/is-int16.js';

export function* int16Encode(value: number): IterableEncoding {
  console.assert(isInt16(value));

  yield new Int16Array([value]);
}

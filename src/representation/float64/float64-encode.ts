import type {IterableEncoding} from '../../type/iterable-encoding.js';

export function* float64Encode(value: number): IterableEncoding {
  yield new Float64Array([value]);
}

import type {IterableEncoding} from '../../type/iterable-encoding';

export function* float64Encode(value: number): IterableEncoding {
  yield new Float64Array([value]);
}

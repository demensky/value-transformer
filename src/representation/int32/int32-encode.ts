import type {IterableEncoding} from '../../type/iterable-encoding';

export function* int32Encode(value: number): IterableEncoding {
  yield new Int32Array([value]);
}

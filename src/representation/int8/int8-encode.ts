import type {IterableEncoding} from '../../type/iterable-encoding';

export function* int8Encode(value: number): IterableEncoding {
  yield new Int8Array([value]);
}

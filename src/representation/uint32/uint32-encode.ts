import type {IterableEncoding} from '../../type/iterable-encoding';

export function* uint32Encode(value: number): IterableEncoding {
  yield new Uint32Array([value]);
}

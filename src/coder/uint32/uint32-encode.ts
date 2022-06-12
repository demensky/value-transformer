import type {IterableEncoding} from '../../type/iterable-encoding.js';

export function* uint32Encode(value: number): IterableEncoding {
  yield new Uint32Array([value]);
}

import type {IterableEncoding} from '../../type/iterable-encoding.js';

export function* uint8Encode(value: number): IterableEncoding {
  yield new Uint8Array([value]);
}

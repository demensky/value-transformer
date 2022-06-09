import type {IterableEncoding} from '../../type/iterable-encoding.js';

export function* uint16Encode(value: number): IterableEncoding {
  yield new Uint16Array([value]);
}

import type {IterableEncoding} from '../../type/iterable-encoding.js';

export function* int16Encode(value: number): IterableEncoding {
  yield new Int16Array([value]);
}

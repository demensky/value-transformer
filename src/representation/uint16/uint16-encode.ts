import type {IterableEncoding} from '../../type/iterable-encoding';

export function* uint16Encode(value: number): IterableEncoding {
  yield new Uint16Array([value]);
}

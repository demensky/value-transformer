import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {listEncode} from '../list/list-encode.js';

export function arrayEncode<T>(
  array: readonly T[],
  encoder: EncodeFactory<T>,
): IterableEncoding {
  return listEncode<T>(array, array.length, encoder);
}

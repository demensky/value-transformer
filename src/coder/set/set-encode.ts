import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {listEncode} from '../list/list-encode.js';

export function setEncode<T>(
  set: ReadonlySet<T>,
  encoder: EncodeFactory<T>,
): IterableEncoding {
  return listEncode<T>(set, set.size, encoder);
}

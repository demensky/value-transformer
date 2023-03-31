import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {listEncode} from '../list/list-encode.js';

export function setEncode<T>(
  set: ReadonlySet<T>,
  encoder: Encoder<T>,
): Encoding {
  return listEncode<T>(set, set.size, encoder);
}

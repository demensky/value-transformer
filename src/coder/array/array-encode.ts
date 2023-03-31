import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {listEncode} from '../list/list-encode.js';

export function arrayEncode<T>(
  array: readonly T[],
  encoder: Encoder<T>,
): Encoding {
  return listEncode<T>(array, array.length, encoder);
}

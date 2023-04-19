import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {getLength} from '../../util/get-length.js';
import {listEncoder} from '../list/list-encoder.js';

export function arrayEncoder<T>(
  array: readonly T[],
  encoder: Encoder<T>,
): Encoding {
  return listEncoder<T, readonly T[]>(array, getLength, encoder);
}

import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {getSize} from '../../util/get-size.js';
import {listEncoder} from '../list/list-encoder.js';

export function setEncoder<T>(
  set: ReadonlySet<T>,
  encoder: Encoder<T>,
): Encoding {
  return listEncoder<T, ReadonlySet<T>>(set, getSize, encoder);
}

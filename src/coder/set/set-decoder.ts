import type {Decoder} from '../../type/decoder.js';
import type {Decoding} from '../../type/decoding.js';
import {listDecoder} from '../list/list-decoder.js';

function setAppend<T>(set: Set<T>, item: T): void {
  set.add(item);
}

export function setDecoder<T>(decoder: Decoder<T>): Decoding<Set<T>> {
  return listDecoder<T, Set<T>>(new Set<T>(), decoder, setAppend);
}

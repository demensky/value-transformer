import type {Decoder} from '../../type/decoder.js';
import type {Decoding} from '../../type/decoding.js';
import {listDecoder} from '../list/list-decoder.js';

function arrayAppend<T>(array: T[], item: T): void {
  array.push(item);
}

export function arrayDecoder<T>(decoder: Decoder<T>): Decoding<T[]> {
  return listDecoder<T, T[]>([], decoder, arrayAppend);
}

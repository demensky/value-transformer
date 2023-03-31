import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {dictionaryEncode} from '../dictionary/dictionary-encode.js';

export function mapEncode<K, V>(
  map: ReadonlyMap<K, V>,
  keyEncoder: Encoder<K>,
  valueEncoder: Encoder<V>,
): Encoding {
  return dictionaryEncode<K, V>(map, map.size, keyEncoder, valueEncoder);
}

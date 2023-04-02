import type {Encoder} from '../../type/encoder.js';
import type {Encoding} from '../../type/encoding.js';
import {dictionaryEncoder} from '../dictionary/dictionary-encoder.js';

export function mapEncoder<K, V>(
  map: ReadonlyMap<K, V>,
  keyEncoder: Encoder<K>,
  valueEncoder: Encoder<V>,
): Encoding {
  return dictionaryEncoder<K, V>(map, map.size, keyEncoder, valueEncoder);
}

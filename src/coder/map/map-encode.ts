import type {EncodeFactory} from '../../type/encode-factory.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {dictionaryEncode} from '../dictionary/dictionary-encode.js';

export function mapEncode<K, V>(
  map: ReadonlyMap<K, V>,
  keyEncoder: EncodeFactory<K>,
  valueEncoder: EncodeFactory<V>,
): IterableEncoding {
  return dictionaryEncode<K, V>(map, map.size, keyEncoder, valueEncoder);
}

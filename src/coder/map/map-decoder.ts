import type {Decoder} from '../../type/decoder.js';
import type {Decoding} from '../../type/decoding.js';
import {dictionaryDecoder} from '../dictionary/dictionary-decoder.js';

function mapAppend<K, V>(map: Map<K, V>, key: K, value: V): void {
  map.set(key, value);
}

export function mapDecoder<K, V>(
  keyDecoder: Decoder<K>,
  valueDecoder: Decoder<V>,
): Decoding<Map<K, V>> {
  return dictionaryDecoder<K, V, Map<K, V>>(
    new Map<K, V>(),
    keyDecoder,
    valueDecoder,
    mapAppend,
  );
}

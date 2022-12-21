import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {dictionaryDecoder} from '../dictionary/dictionary-decoder.js';

function mapAppend<K, V>(map: Map<K, V>, key: K, value: V): void {
  map.set(key, value);
}

export function mapDecoder<K, V>(
  keyDecoder: DecoderGeneratorFactory<K>,
  valueDecoder: DecoderGeneratorFactory<V>,
): DecoderGenerator<Map<K, V>> {
  return dictionaryDecoder<K, V, Map<K, V>>(
    new Map<K, V>(),
    keyDecoder,
    valueDecoder,
    mapAppend,
  );
}

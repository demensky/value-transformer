import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {listDecoder} from '../list/list-decoder.js';

function setAppend<T>(set: Set<T>, item: T): void {
  set.add(item);
}

export function setDecoder<T>(
  decoder: DecoderGeneratorFactory<T>,
): DecoderGenerator<Set<T>> {
  return listDecoder<T, Set<T>>(new Set<T>(), decoder, setAppend);
}

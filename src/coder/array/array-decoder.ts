import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {listDecoder} from '../list/list-decoder.js';

function arrayAppend<T>(array: T[], item: T): void {
  array.push(item);
}

export function arrayDecoder<T>(
  decoder: DecoderGeneratorFactory<T>,
): DecoderGenerator<T[]> {
  return listDecoder<T, T[]>([], decoder, arrayAppend);
}

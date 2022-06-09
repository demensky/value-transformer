import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory.js';
import {booleanDecoder} from '../boolean/boolean-decoder.js';

export function* nullableDecoder<T>(
  decoder: DecoderGeneratorFactory<T>,
): DecoderGenerator<T | null> {
  return (yield* booleanDecoder()) ? yield* decoder() : null;
}

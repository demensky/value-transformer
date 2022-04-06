import type {DecoderGenerator} from '../../type/decoder-generator';
import type {DecoderGeneratorFactory} from '../../type/decoder-generator-factory';
import {booleanDecoder} from '../boolean/boolean-decoder';

export function* nullableDecoder<T>(
  decoder: DecoderGeneratorFactory<T>,
): DecoderGenerator<T | null> {
  return (yield* booleanDecoder()) ? yield* decoder() : null;
}

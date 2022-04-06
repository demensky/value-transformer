import type {DecoderGeneratorFactory} from '../type/decoder-generator-factory';

import type {ValueTransformerOutput} from './value-transformer-output';

export function transformerDecoder<O>(
  transformer: ValueTransformerOutput<O>,
): DecoderGeneratorFactory<O> {
  return () => transformer.decoder();
}

import type {DecoderGeneratorFactory} from '../type/decoder-generator-factory';

import type {ValueTransformerOutput} from './value-transformer-output';

export function decoder<O>(
  transformer: ValueTransformerOutput<O>,
): DecoderGeneratorFactory<O> {
  return () => transformer.decoder();
}

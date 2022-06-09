import type {DecoderGeneratorFactory} from '../type/decoder-generator-factory.js';

import type {ValueTransformerOutput} from './value-transformer-output.js';

export function decoder<O>(
  transformer: ValueTransformerOutput<O>,
): DecoderGeneratorFactory<O> {
  return () => transformer.decoder();
}

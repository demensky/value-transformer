import type {EncodeFactory} from '../type/encode-factory';

import type {ValueTransformerInput} from './value-transformer-input';

export function transformerEncode<I>(
  transformer: ValueTransformerInput<I>,
): EncodeFactory<I> {
  return (data) => transformer.encode(data);
}

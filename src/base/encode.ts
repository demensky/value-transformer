import type {EncodeFactory} from '../type/encode-factory.js';

import type {ValueTransformerInput} from './value-transformer-input.js';

export function encode<I>(
  transformer: ValueTransformerInput<I>,
): EncodeFactory<I> {
  return (data) => transformer.encode(data);
}

import type {ValueTransformerInput} from './value-transformer-input';

export function toLiteral<I>(
  transformer: ValueTransformerInput<I>,
): (data: I) => unknown {
  return (data) => transformer.toLiteral(data);
}

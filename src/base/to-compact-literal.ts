import type {ValueTransformerInput} from './value-transformer-input';

export function toCompactLiteral<I>(
  transformer: ValueTransformerInput<I>,
): (data: I) => unknown {
  return (data) => transformer.toCompactLiteral(data);
}

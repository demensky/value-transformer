import type {ValueTransformer} from './value-transformer';

export function toCompactLiteral<I>(
  transformer: ValueTransformer<I, I>,
): (data: I) => unknown {
  return (data) => transformer.toCompactLiteral(data);
}
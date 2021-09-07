import type {ValueTransformer} from './value-transformer';

export function toLiteral<I>(
  transformer: ValueTransformer<I, I>,
): (data: I) => unknown {
  return (data) => transformer.toLiteral(data);
}

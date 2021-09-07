import type {ValueTransformer} from '../base/value-transformer';

export function compatibleWith<I>(
  transformer: ValueTransformer<I, I>,
): (data: unknown) => data is I {
  return (data): data is I => transformer.compatibleWith(data);
}

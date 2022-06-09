import type {ValueTransformerInput} from './value-transformer-input.js';

export function compatibleWith<I>(
  transformer: ValueTransformerInput<I>,
): (data: unknown) => data is I {
  return (data): data is I => transformer.compatibleWith(data);
}

import type {ValueTransformer} from '../base/value-transformer';

export function fromLiteral<O>(
  transformer: ValueTransformer<unknown, O>,
): (literal: unknown) => O {
  return (literal) => transformer.fromLiteral(literal);
}

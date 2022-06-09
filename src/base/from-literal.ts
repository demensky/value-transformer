import type {ValueTransformerOutput} from './value-transformer-output.js';

export function fromLiteral<O>(
  transformer: ValueTransformerOutput<O>,
): (literal: unknown) => O {
  return (literal) => transformer.fromLiteral(literal);
}

export interface ValueTransformerInput<I> {
  compatibleWith(data: unknown): data is I;

  toLiteral(data: I): unknown;

  toCompactLiteral(data: I): unknown;
}

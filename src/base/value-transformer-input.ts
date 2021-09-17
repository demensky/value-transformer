export interface ValueTransformerInput<R> {
  compatibleWith(data: unknown): data is R;

  toLiteral(data: R): unknown;

  toCompactLiteral(data: R): unknown;
}

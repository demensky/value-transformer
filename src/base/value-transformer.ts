export abstract class ValueTransformer<I, O extends I> {
  public abstract compatibleWith(data: unknown): data is I;

  public abstract fromLiteral(literal: unknown): O;

  public abstract toLiteral(data: I): unknown;

  public toCompactLiteral(data: I): unknown {
    return this.toLiteral(data);
  }
}

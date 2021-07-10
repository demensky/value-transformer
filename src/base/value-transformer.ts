export abstract class ValueTransformer<T> {
  public abstract fromLiteral(literal: unknown): T;

  public abstract toLiteral(data: T): unknown;

  public toCompactLiteral(data: T): unknown {
    return this.toLiteral(data);
  }
}

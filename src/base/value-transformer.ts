export abstract class ValueTransformer<T> {
  public abstract compatibleWith(data: unknown): data is T;

  public abstract fromLiteral(literal: unknown): T;

  public abstract toLiteral(data: T): unknown;

  public internalDataCanBeVerified(_data: T): boolean {
    return true;
  }

  public toCompactLiteral(data: T): unknown {
    return this.toLiteral(data);
  }
}

import {OffsetCounter} from './offset-counter';

export abstract class ValueTransformer<T> {
  public abstract fromDataView(view: DataView, offset: OffsetCounter): T;

  public abstract fromLiteral(literal: unknown): T;

  public abstract toArrayBuffers(data: T): Iterable<ArrayBuffer>;

  public toCompactLiteral(data: T): unknown {
    return this.toLiteral(data);
  }

  public abstract toLiteral(data: T): unknown;
}

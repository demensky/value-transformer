import {ValueTransformer} from '../base/value-transformer';

export class SetTransformer<T> extends ValueTransformer<Set<T>> {
  public constructor(private readonly _transformer: ValueTransformer<T>) {
    super();
  }

  public toLiteral(data: ReadonlySet<T>): unknown {
    return Array.from<T, unknown>(data, (item) =>
      this._transformer.toLiteral(item),
    );
  }

  public override toCompactLiteral(data: ReadonlySet<T>): unknown {
    return Array.from<T, unknown>(data, (item) =>
      this._transformer.toCompactLiteral(item),
    );
  }

  public fromLiteral(_literal: unknown): Set<T> {
    throw new Error('Not implemented');
  }
}

import {ValueTransformer} from '../base/value-transformer';

export class SetTransformer<T> extends ValueTransformer<Set<T>> {
  public constructor(private readonly _transformer: ValueTransformer<T>) {
    super();
  }

  public compatibleWith(_data: unknown): _data is Set<T> {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): Set<T> {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(data: ReadonlySet<T>): unknown {
    return Array.from<T, unknown>(data, (item) =>
      this._transformer.toCompactLiteral(item),
    );
  }

  public toLiteral(data: ReadonlySet<T>): unknown {
    return Array.from<T, unknown>(data, (item) =>
      this._transformer.toLiteral(item),
    );
  }
}

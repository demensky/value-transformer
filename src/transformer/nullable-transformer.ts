import {ValueTransformer} from '../base/value-transformer';

export class NullableTransformer<T> extends ValueTransformer<T | null> {
  public constructor(private readonly _transformer: ValueTransformer<T>) {
    super();
  }

  public toLiteral(data: T | null): unknown {
    return data === null ? null : this._transformer.toLiteral(data);
  }

  public override toCompactLiteral(data: T | null): unknown {
    return data === null ? null : this._transformer.toCompactLiteral(data);
  }

  public fromLiteral(_literal: unknown): T | null {
    throw new Error('Not implemented');
  }
}

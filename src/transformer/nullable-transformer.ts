import {ValueTransformer} from '../base/value-transformer';

export class NullableTransformer<T> extends ValueTransformer<T | null> {
  public constructor(private readonly _transformer: ValueTransformer<T>) {
    super();
  }

  public compatibleWith(_data: unknown): _data is T | null {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): T | null {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(data: T | null): unknown {
    return data === null ? null : this._transformer.toCompactLiteral(data);
  }

  public toLiteral(data: T | null): unknown {
    return data === null ? null : this._transformer.toLiteral(data);
  }
}

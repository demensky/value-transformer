import {ValueTransformer} from '../base/value-transformer';

export class NullableTransformer<I, O extends I> extends ValueTransformer<
  I | null,
  O | null
> {
  public constructor(private readonly _transformer: ValueTransformer<I, O>) {
    super();
  }

  public compatibleWith(_data: unknown): _data is I | null {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): O | null {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(data: I | null): unknown {
    return data === null ? null : this._transformer.toCompactLiteral(data);
  }

  public toLiteral(data: I | null): unknown {
    return data === null ? null : this._transformer.toLiteral(data);
  }
}

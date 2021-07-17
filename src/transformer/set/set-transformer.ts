import {ValueTransformer} from '../../base/value-transformer';

export class SetTransformer<I, O extends I> extends ValueTransformer<
  ReadonlySet<I>,
  Set<O>
> {
  public constructor(private readonly _transformer: ValueTransformer<I, O>) {
    super();
  }

  public compatibleWith(_data: unknown): _data is ReadonlySet<I> {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): Set<O> {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(data: ReadonlySet<I>): unknown {
    return Array.from<I, unknown>(data, (item) =>
      this._transformer.toCompactLiteral(item),
    );
  }

  public toLiteral(data: ReadonlySet<I>): unknown {
    return Array.from<I, unknown>(data, (item) =>
      this._transformer.toLiteral(item),
    );
  }
}

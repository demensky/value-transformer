import {ValueTransformer} from '../../base/value-transformer';
import {isNull} from '../../util/is-null';

export class NullableTransformer<I, O extends I> extends ValueTransformer<
  I | null,
  O | null
> {
  public constructor(private readonly _transformer: ValueTransformer<I, O>) {
    super();
  }

  public compatibleWith(data: unknown): data is I | null {
    return isNull(data) ? true : this._transformer.compatibleWith(data);
  }

  public fromLiteral(literal: unknown): O | null {
    return isNull(literal) ? null : this._transformer.fromLiteral(literal);
  }

  public override toCompactLiteral(data: I | null): unknown {
    return isNull(data) ? null : this._transformer.toCompactLiteral(data);
  }

  public toLiteral(data: I | null): unknown {
    return isNull(data) ? null : this._transformer.toLiteral(data);
  }
}

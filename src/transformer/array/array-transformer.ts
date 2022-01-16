import {compatibleWith} from '../../base/compatible-with';
import {fromLiteral} from '../../base/from-literal';
import {toCompactLiteral} from '../../base/to-compact-literal';
import {toLiteral} from '../../base/to-literal';
import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {denseArrayLike} from '../../util/dense-array-like';
import {every} from '../../util/every';
import {isArray} from '../../util/guard/is-array';

// TODO tests
export class ArrayTransformer<I, O extends I> extends ValueTransformer<
  readonly I[],
  O[]
> {
  public constructor(private readonly _transformer: ValueTransformer<I, O>) {
    super();
  }

  public compatibleWith(data: unknown): data is readonly I[] {
    return isArray(data) && every(data, compatibleWith<I>(this._transformer));
  }

  public fromLiteral(literal: unknown): O[] {
    if (!isArray(literal)) {
      throw new IncompatibleLiteralError();
    }

    return Array.from<unknown, O>(literal, fromLiteral<O>(this._transformer));
  }

  public override toCompactLiteral(data: readonly I[]): unknown {
    console.assert(isArray(data));

    return Array.from<I, unknown>(
      denseArrayLike<I>(data),
      toCompactLiteral<I>(this._transformer),
    );
  }

  public toLiteral(data: readonly I[]): unknown {
    console.assert(isArray(data));

    return Array.from<I, unknown>(
      denseArrayLike<I>(data),
      toLiteral<I>(this._transformer),
    );
  }
}

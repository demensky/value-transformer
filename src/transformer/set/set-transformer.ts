import {compatibleWith} from '../../base/compatible-with';
import {fromLiteral} from '../../base/from-literal';
import {toCompactLiteral} from '../../base/to-compact-literal';
import {toLiteral} from '../../base/to-literal';
import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {every} from '../../util/every';
import {isArray} from '../../util/guard/is-array';
import {isSet} from '../../util/guard/is-set';
import {map} from '../../util/map';

// TODO tests
export class SetTransformer<I, O extends I> extends ValueTransformer<
  ReadonlySet<I>,
  Set<O>
> {
  public constructor(private readonly _transformer: ValueTransformer<I, O>) {
    super();
  }

  public compatibleWith(data: unknown): data is ReadonlySet<I> {
    return isSet(data) && every(data, compatibleWith<I>(this._transformer));
  }

  public fromLiteral(literal: unknown): Set<O> {
    if (!isArray(literal)) {
      throw new IncompatibleLiteralError();
    }

    return new Set<O>(
      map<unknown, O>(literal, fromLiteral<O>(this._transformer)),
    );
  }

  public override toCompactLiteral(data: ReadonlySet<I>): unknown {
    console.assert(isSet(data));

    return Array.from<I, unknown>(data, toCompactLiteral<I>(this._transformer));
  }

  public toLiteral(data: ReadonlySet<I>): unknown {
    console.assert(isSet(data));

    return Array.from<I, unknown>(data, toLiteral<I>(this._transformer));
  }
}

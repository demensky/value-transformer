import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {compatibleWith} from '../../util/compatible-with';
import {every} from '../../util/every';
import {fromLiteral} from '../../util/from-literal';
import {isArray} from '../../util/is-array';
import {isSet} from '../../util/is-set';
import {map} from '../../util/map';
import {toCompactLiteral} from '../../util/to-compact-literal';
import {toLiteral} from '../../util/to-literal';

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
    return Array.from<I, unknown>(data, toCompactLiteral<I>(this._transformer));
  }

  public toLiteral(data: ReadonlySet<I>): unknown {
    return Array.from<I, unknown>(data, toLiteral<I>(this._transformer));
  }
}

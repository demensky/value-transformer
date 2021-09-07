import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {compatibleWith} from '../../util/compatible-with';
import {every} from '../../util/every';
import {isArray} from '../../util/guard/is-array';
import {isEntry} from '../../util/guard/is-entry';
import {isMap} from '../../util/guard/is-map';
import {map} from '../../util/map';
import {mapEntries} from '../../util/map-entries';
import {toCompactLiteral} from '../../util/to-compact-literal';
import {toLiteral} from '../../util/to-literal';

export class MapTransformer<
  KI,
  KO extends KI,
  VI,
  VO extends VI,
> extends ValueTransformer<ReadonlyMap<KI, VI>, Map<KO, VO>> {
  public constructor(
    private readonly _keyTransformer: ValueTransformer<KI, KO>,
    private readonly _valueTransformer: ValueTransformer<VI, VO>,
  ) {
    super();
  }

  public compatibleWith(data: unknown): data is ReadonlyMap<KI, VI> {
    return (
      isMap(data) &&
      every<unknown>(data.keys(), compatibleWith<KI>(this._keyTransformer)) &&
      every<unknown>(data.values(), compatibleWith<VI>(this._valueTransformer))
    );
  }

  public fromLiteral(literal: unknown): Map<KO, VO> {
    if (!isArray(literal)) {
      throw new IncompatibleLiteralError();
    }

    return new Map<KO, VO>(
      map<unknown, readonly [KO, VO]>(literal, (item) => {
        if (!isEntry(item)) {
          throw new IncompatibleLiteralError();
        }

        const [key, value]: readonly [unknown, unknown] = item;

        return [
          this._keyTransformer.fromLiteral(key),
          this._valueTransformer.fromLiteral(value),
        ];
      }),
    );
  }

  public override toCompactLiteral(data: ReadonlyMap<KI, VI>): unknown {
    return Array.from<readonly [unknown, unknown]>(
      mapEntries<KI, unknown, VI, unknown>(
        data,
        toCompactLiteral<KI>(this._keyTransformer),
        toCompactLiteral<VI>(this._valueTransformer),
      ),
    );
  }

  public toLiteral(data: ReadonlyMap<KI, VI>): unknown {
    return Array.from<readonly [unknown, unknown]>(
      mapEntries<KI, unknown, VI, unknown>(
        data,
        toLiteral<KI>(this._keyTransformer),
        toLiteral<VI>(this._valueTransformer),
      ),
    );
  }
}

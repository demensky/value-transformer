import {compatibleWith} from '../../base/compatible-with.js';
import {decoder} from '../../base/decoder.js';
import {encode} from '../../base/encode.js';
import {toCompactLiteral} from '../../base/to-compact-literal.js';
import {toLiteral} from '../../base/to-literal.js';
import {ValueTransformer} from '../../base/value-transformer.js';
import {mapDecoder} from '../../coder/map/map-decoder.js';
import {mapEncode} from '../../coder/map/map-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {every} from '../../util/every.js';
import {isArray} from '../../util/guard/is-array.js';
import {isEntry} from '../../util/guard/is-entry.js';
import {isMap} from '../../util/guard/is-map.js';
import {map} from '../../util/map.js';
import {mapEntries} from '../../util/map-entries.js';

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

  public decoder(): DecoderGenerator<Map<KO, VO>> {
    return mapDecoder<KO, VO>(
      decoder<KO>(this._keyTransformer),
      decoder<VO>(this._valueTransformer),
    );
  }

  public encode(data: ReadonlyMap<KI, VI>): IterableEncoding {
    console.assert(isMap(data));

    return mapEncode<KI, VI>(
      data,
      encode<KI>(this._keyTransformer),
      encode<VI>(this._valueTransformer),
    );
  }

  public fromLiteral(literal: unknown): Map<KO, VO> {
    if (!isArray(literal)) {
      throw new IncompatibleLiteralError();
    }

    return new Map<KO, VO>(
      map<unknown, readonly [KO, VO]>(literal, (item) => {
        if (!isArray(item) || !isEntry(item)) {
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
    console.assert(isMap(data));

    return Array.from<readonly [unknown, unknown]>(
      mapEntries<KI, unknown, VI, unknown>(
        data,
        toCompactLiteral<KI>(this._keyTransformer),
        toCompactLiteral<VI>(this._valueTransformer),
      ),
    );
  }

  public toLiteral(data: ReadonlyMap<KI, VI>): unknown {
    console.assert(isMap(data));

    return Array.from<readonly [unknown, unknown]>(
      mapEntries<KI, unknown, VI, unknown>(
        data,
        toLiteral<KI>(this._keyTransformer),
        toLiteral<VI>(this._valueTransformer),
      ),
    );
  }
}

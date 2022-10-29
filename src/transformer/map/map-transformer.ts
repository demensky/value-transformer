import {compatibleWith} from '../../base/compatible-with.js';
import {decoder} from '../../base/decoder.js';
import {encode} from '../../base/encode.js';
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
  readonly #keyTransformer: ValueTransformer<KI, KO>;

  readonly #valueTransformer: ValueTransformer<VI, VO>;

  public constructor(
    keyTransformer: ValueTransformer<KI, KO>,
    valueTransformer: ValueTransformer<VI, VO>,
  ) {
    super();

    this.#valueTransformer = valueTransformer;
    this.#keyTransformer = keyTransformer;
  }

  public compatibleWith(data: unknown): data is ReadonlyMap<KI, VI> {
    return (
      isMap(data) &&
      every<unknown>(data.keys(), compatibleWith<KI>(this.#keyTransformer)) &&
      every<unknown>(data.values(), compatibleWith<VI>(this.#valueTransformer))
    );
  }

  public decoder(): DecoderGenerator<Map<KO, VO>> {
    return mapDecoder<KO, VO>(
      decoder<KO>(this.#keyTransformer),
      decoder<VO>(this.#valueTransformer),
    );
  }

  public encode(data: ReadonlyMap<KI, VI>): IterableEncoding {
    console.assert(isMap(data));

    return mapEncode<KI, VI>(
      data,
      encode<KI>(this.#keyTransformer),
      encode<VI>(this.#valueTransformer),
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
          this.#keyTransformer.fromLiteral(key),
          this.#valueTransformer.fromLiteral(value),
        ];
      }),
    );
  }

  public toLiteral(data: ReadonlyMap<KI, VI>, compact: boolean): unknown {
    console.assert(isMap(data));

    return Array.from<readonly [unknown, unknown]>(
      mapEntries<KI, unknown, VI, unknown>(
        data,
        toLiteral<KI>(this.#keyTransformer, compact),
        toLiteral<VI>(this.#valueTransformer, compact),
      ),
    );
  }
}

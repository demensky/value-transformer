import {mapDecoder} from '../../coder/map/map-decoder.js';
import {mapEncoder} from '../../coder/map/map-encoder.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {every} from '../../util/every.js';
import {isArray} from '../../util/guard/is-array.js';
import {isEntry} from '../../util/guard/is-entry.js';
import {isMap} from '../../util/guard/is-map.js';
import {map} from '../../util/map.js';
import {ValueTransformer} from '../value/value-transformer.js';

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
      every(
        data,
        ([key, value]) =>
          this.#keyTransformer.compatibleWith(key) &&
          this.#valueTransformer.compatibleWith(value),
      )
    );
  }

  public decoder(): Decoding<Map<KO, VO>> {
    return mapDecoder<KO, VO>(
      () => this.#keyTransformer.decoder(),
      () => this.#valueTransformer.decoder(),
    );
  }

  public encoder(data: ReadonlyMap<KI, VI>): Encoding {
    console.assert(isMap(data));

    return mapEncoder<KI, VI>(
      data,
      (key) => this.#keyTransformer.encoder(key),
      (value) => this.#valueTransformer.encoder(value),
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

    return Array.from<readonly [KI, VI], readonly [unknown, unknown]>(
      data,
      ([key, value]) => [
        this.#keyTransformer.toLiteral(key, compact),
        this.#valueTransformer.toLiteral(value, compact),
      ],
    );
  }
}

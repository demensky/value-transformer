import {setDecoder} from '../../coder/set/set-decoder.js';
import {setEncoder} from '../../coder/set/set-encoder.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {every} from '../../util/every.js';
import {isArray} from '../../util/guard/is-array.js';
import {isSet} from '../../util/guard/is-set.js';
import {map} from '../../util/map.js';
import {ValueTransformer} from '../value/value-transformer.js';

// TODO tests
export class SetTransformer<I, O extends I> extends ValueTransformer<
  ReadonlySet<I>,
  Set<O>
> {
  readonly #transformer: ValueTransformer<I, O>;

  public constructor(transformer: ValueTransformer<I, O>) {
    super();

    this.#transformer = transformer;
  }

  public compatibleWith(data: unknown): data is ReadonlySet<I> {
    return (
      isSet(data) &&
      every(data, (item) => this.#transformer.compatibleWith(item))
    );
  }

  public decoder(): Decoding<Set<O>> {
    return setDecoder<O>(() => this.#transformer.decoder());
  }

  public encoder(data: ReadonlySet<I>): Encoding {
    console.assert(isSet(data));

    return setEncoder<I>(data, (item) => this.#transformer.encoder(item));
  }

  public fromLiteral(literal: unknown): Set<O> {
    if (!isArray(literal)) {
      throw new IncompatibleLiteralError();
    }

    return new Set<O>(
      map<unknown, O>(literal, (item) => this.#transformer.fromLiteral(item)),
    );
  }

  public toLiteral(data: ReadonlySet<I>, compact: boolean): unknown {
    console.assert(isSet(data));

    return Array.from<I, unknown>(data, (item) =>
      this.#transformer.toLiteral(item, compact),
    );
  }
}

import {setDecoder} from '../../coder/set/set-decoder.js';
import {setEncode} from '../../coder/set/set-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
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

  public decoder(): DecoderGenerator<Set<O>> {
    return setDecoder<O>(() => this.#transformer.decoder());
  }

  public encode(data: ReadonlySet<I>): IterableEncoding {
    console.assert(isSet(data));

    return setEncode<I>(data, (item) => this.#transformer.encode(item));
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

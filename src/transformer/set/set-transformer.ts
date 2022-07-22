import {compatibleWith} from '../../base/compatible-with.js';
import {decoder} from '../../base/decoder.js';
import {encode} from '../../base/encode.js';
import {fromLiteral} from '../../base/from-literal.js';
import {toCompactLiteral} from '../../base/to-compact-literal.js';
import {toLiteral} from '../../base/to-literal.js';
import {ValueTransformer} from '../../base/value-transformer.js';
import {setDecoder} from '../../coder/set/set-decoder.js';
import {setEncode} from '../../coder/set/set-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {every} from '../../util/every.js';
import {isArray} from '../../util/guard/is-array.js';
import {isSet} from '../../util/guard/is-set.js';
import {map} from '../../util/map.js';

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
    return isSet(data) && every(data, compatibleWith<I>(this.#transformer));
  }

  public decoder(): DecoderGenerator<Set<O>> {
    return setDecoder<O>(decoder<O>(this.#transformer));
  }

  public encode(data: ReadonlySet<I>): IterableEncoding {
    console.assert(isSet(data));

    return setEncode<I>(data, encode<I>(this.#transformer));
  }

  public fromLiteral(literal: unknown): Set<O> {
    if (!isArray(literal)) {
      throw new IncompatibleLiteralError();
    }

    return new Set<O>(
      map<unknown, O>(literal, fromLiteral<O>(this.#transformer)),
    );
  }

  public override toCompactLiteral(data: ReadonlySet<I>): unknown {
    console.assert(isSet(data));

    return Array.from<I, unknown>(data, toCompactLiteral<I>(this.#transformer));
  }

  public toLiteral(data: ReadonlySet<I>): unknown {
    console.assert(isSet(data));

    return Array.from<I, unknown>(data, toLiteral<I>(this.#transformer));
  }
}

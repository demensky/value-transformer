import {ValueTransformer} from '../../base/value-transformer.js';
import {arrayDecoder} from '../../coder/array/array-decoder.js';
import {arrayEncode} from '../../coder/array/array-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {denseArrayLike} from '../../util/dense-array-like.js';
import {isArray} from '../../util/guard/is-array.js';

// TODO tests
export class ArrayTransformer<I, O extends I> extends ValueTransformer<
  readonly I[],
  O[]
> {
  readonly #transformer: ValueTransformer<I, O>;

  public constructor(_transformer: ValueTransformer<I, O>) {
    super();

    this.#transformer = _transformer;
  }

  public compatibleWith(data: unknown): data is readonly I[] {
    return (
      isArray(data) &&
      data.every((item) => this.#transformer.compatibleWith(item))
    );
  }

  public decoder(): DecoderGenerator<O[]> {
    return arrayDecoder<O>(() => this.#transformer.decoder());
  }

  public encode(data: readonly I[]): IterableEncoding {
    console.assert(isArray(data));

    return arrayEncode<I>(data, (item) => this.#transformer.encode(item));
  }

  public fromLiteral(literal: unknown): O[] {
    if (!isArray(literal)) {
      throw new IncompatibleLiteralError();
    }

    return Array.from<unknown, O>(literal, (item) =>
      this.#transformer.fromLiteral(item),
    );
  }

  public toLiteral(data: readonly I[], compact: boolean): unknown {
    console.assert(isArray(data));

    return Array.from<I, unknown>(denseArrayLike<I>(data), (item) =>
      this.#transformer.toLiteral(item, compact),
    );
  }
}

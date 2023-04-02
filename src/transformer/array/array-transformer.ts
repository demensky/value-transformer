import {arrayDecoder} from '../../coder/array/array-decoder.js';
import {arrayEncoder} from '../../coder/array/array-encoder.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {denseArrayLike} from '../../util/dense-array-like.js';
import {isArray} from '../../util/guard/is-array.js';
import {ValueTransformer} from '../value/value-transformer.js';

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

  public decoder(): Decoding<O[]> {
    return arrayDecoder<O>(() => this.#transformer.decoder());
  }

  public encoder(data: readonly I[]): Encoding {
    console.assert(isArray(data));

    return arrayEncoder<I>(data, (item) => this.#transformer.encoder(item));
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

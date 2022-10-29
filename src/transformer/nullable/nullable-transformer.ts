import {decoder} from '../../base/decoder.js';
import {encode} from '../../base/encode.js';
import {ValueTransformer} from '../../base/value-transformer.js';
import {nullableDecoder} from '../../coder/nullable/nullable-decoder.js';
import {nullableEncode} from '../../coder/nullable/nullable-encode.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isNull} from '../../util/guard/is-null.js';

export class NullableTransformer<I, O extends I> extends ValueTransformer<
  I | null,
  O | null
> {
  readonly #transformer: ValueTransformer<I, O>;

  public constructor(transformer: ValueTransformer<I, O>) {
    super();

    this.#transformer = transformer;
  }

  public compatibleWith(data: unknown): data is I | null {
    return isNull(data) || this.#transformer.compatibleWith(data);
  }

  public decoder(): DecoderGenerator<O | null> {
    return nullableDecoder<O>(decoder<O>(this.#transformer));
  }

  public encode(data: I | null): IterableEncoding {
    return nullableEncode<I>(data, encode<I>(this.#transformer));
  }

  public fromLiteral(literal: unknown): O | null {
    return isNull(literal) ? null : this.#transformer.fromLiteral(literal);
  }

  public toLiteral(data: I | null, compact: boolean): unknown {
    return isNull(data) ? null : this.#transformer.toLiteral(data, compact);
  }
}

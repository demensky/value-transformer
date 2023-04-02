import {nullableDecoder} from '../../coder/nullable/nullable-decoder.js';
import {nullableEncode} from '../../coder/nullable/nullable-encode.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {isNull} from '../../util/guard/is-null.js';
import {ValueTransformer} from '../value/value-transformer.js';

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

  public decoder(): Decoding<O | null> {
    return nullableDecoder<O>(() => this.#transformer.decoder());
  }

  public encode(data: I | null): Encoding {
    return nullableEncode<I>(data, (item) => this.#transformer.encode(item));
  }

  public fromLiteral(literal: unknown): O | null {
    return isNull(literal) ? null : this.#transformer.fromLiteral(literal);
  }

  public toLiteral(data: I | null, compact: boolean): unknown {
    return isNull(data) ? null : this.#transformer.toLiteral(data, compact);
  }
}

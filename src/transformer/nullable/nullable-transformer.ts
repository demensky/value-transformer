import {transformerDecoder} from '../../base/transformer-decoder';
import {transformerEncode} from '../../base/transformer-encode';
import {ValueTransformer} from '../../base/value-transformer';
import {nullableDecoder} from '../../representation/nullable/nullable-decoder';
import {nullableEncode} from '../../representation/nullable/nullable-encode';
import type {DecoderGenerator} from '../../type/decoder-generator';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {isNull} from '../../util/guard/is-null';

export class NullableTransformer<I, O extends I> extends ValueTransformer<
  I | null,
  O | null
> {
  public constructor(private readonly _transformer: ValueTransformer<I, O>) {
    super();
  }

  public compatibleWith(data: unknown): data is I | null {
    return isNull(data) || this._transformer.compatibleWith(data);
  }

  public decoder(): DecoderGenerator<O | null> {
    return nullableDecoder<O>(transformerDecoder<O>(this._transformer));
  }

  public encode(data: I | null): IterableEncoding {
    return nullableEncode<I>(data, transformerEncode<I>(this._transformer));
  }

  public fromLiteral(literal: unknown): O | null {
    return isNull(literal) ? null : this._transformer.fromLiteral(literal);
  }

  public override toCompactLiteral(data: I | null): unknown {
    return isNull(data) ? null : this._transformer.toCompactLiteral(data);
  }

  public toLiteral(data: I | null): unknown {
    return isNull(data) ? null : this._transformer.toLiteral(data);
  }
}

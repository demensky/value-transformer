import {compatibleWith} from '../../base/compatible-with.js';
import {decoder} from '../../base/decoder.js';
import {encode} from '../../base/encode.js';
import {fromLiteral} from '../../base/from-literal.js';
import {toCompactLiteral} from '../../base/to-compact-literal.js';
import {toLiteral} from '../../base/to-literal.js';
import {ValueTransformer} from '../../base/value-transformer.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {arrayDecoder} from '../../representation/array/array-decoder.js';
import {arrayEncode} from '../../representation/array/array-encode.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {denseArrayLike} from '../../util/dense-array-like.js';
import {every} from '../../util/every.js';
import {isArray} from '../../util/guard/is-array.js';

// TODO tests
export class ArrayTransformer<I, O extends I> extends ValueTransformer<
  readonly I[],
  O[]
> {
  public constructor(private readonly _transformer: ValueTransformer<I, O>) {
    super();
  }

  public compatibleWith(data: unknown): data is readonly I[] {
    return isArray(data) && every(data, compatibleWith<I>(this._transformer));
  }

  public decoder(): DecoderGenerator<O[]> {
    return arrayDecoder<O>(decoder<O>(this._transformer));
  }

  public encode(data: readonly I[]): IterableEncoding {
    console.assert(isArray(data));

    return arrayEncode<I>(data, encode<I>(this._transformer));
  }

  public fromLiteral(literal: unknown): O[] {
    if (!isArray(literal)) {
      throw new IncompatibleLiteralError();
    }

    return Array.from<unknown, O>(literal, fromLiteral<O>(this._transformer));
  }

  public override toCompactLiteral(data: readonly I[]): unknown {
    console.assert(isArray(data));

    return Array.from<I, unknown>(
      denseArrayLike<I>(data),
      toCompactLiteral<I>(this._transformer),
    );
  }

  public toLiteral(data: readonly I[]): unknown {
    console.assert(isArray(data));

    return Array.from<I, unknown>(
      denseArrayLike<I>(data),
      toLiteral<I>(this._transformer),
    );
  }
}

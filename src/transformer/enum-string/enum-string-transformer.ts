import {ValueTransformer} from '../../base/value-transformer.js';
import {stringDecoder} from '../../coder/string/string-decoder.js';
import {stringEncode} from '../../coder/string/string-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {EnumDefinition} from '../../type/enum-definition.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {extractEnumValues} from '../../util/extract-enum-values.js';
import {isString} from '../../util/guard/is-string.js';
import {isInSet} from '../../util/is-in-set.js';

export class EnumStringTransformer<V extends string> extends ValueTransformer<
  V,
  V
> {
  public static fromDefinition<K extends string, V extends string>(
    definition: EnumDefinition<K, V>,
  ): EnumStringTransformer<V> {
    return new EnumStringTransformer<V>(extractEnumValues<K, V>(definition));
  }

  private constructor(private readonly _values: ReadonlySet<V>) {
    super();
  }

  public compatibleWith(data: unknown): data is V {
    return isString(data) && isInSet<V>(data, this._values);
  }

  public *decoder(): DecoderGenerator<V> {
    const value: string = yield* stringDecoder();

    if (!isInSet<V>(value, this._values)) {
      throw new InvalidBufferValueError();
    }

    return value;
  }

  public encode(data: V): IterableEncoding {
    console.assert(isString(data) && isInSet<V>(data, this._values));

    return stringEncode(data);
  }

  public fromLiteral(literal: unknown): V {
    if (!isString(literal) || !isInSet<V>(literal, this._values)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public toLiteral(data: V): unknown {
    console.assert(isString(data) && isInSet<V>(data, this._values));

    return data;
  }
}

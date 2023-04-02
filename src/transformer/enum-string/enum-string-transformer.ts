import {stringDecoder} from '../../coder/string/string-decoder.js';
import {stringEncode} from '../../coder/string/string-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import type {EnumDefinition} from '../../type/enum-definition.js';
import {extractEnumValues} from '../../util/extract-enum-values.js';
import {isString} from '../../util/guard/is-string.js';
import {isInSet} from '../../util/is-in-set.js';
import {ValueTransformer} from '../value/value-transformer.js';

export class EnumStringTransformer<V extends string> extends ValueTransformer<
  V,
  V
> {
  public static fromDefinition<K extends string, V extends string>(
    definition: EnumDefinition<K, V>,
  ): EnumStringTransformer<V> {
    return new EnumStringTransformer<V>(extractEnumValues<K, V>(definition));
  }

  readonly #values: ReadonlySet<V>;

  private constructor(values: ReadonlySet<V>) {
    super();

    this.#values = values;
  }

  public compatibleWith(data: unknown): data is V {
    return isString(data) && isInSet<V>(data, this.#values);
  }

  public *decoder(): Decoding<V> {
    const value: string = yield* stringDecoder();

    if (!isInSet<V>(value, this.#values)) {
      throw new InvalidBufferValueError();
    }

    return value;
  }

  public encode(data: V): Encoding {
    console.assert(isString(data) && isInSet<V>(data, this.#values));

    return stringEncode(data);
  }

  public fromLiteral(literal: unknown): V {
    if (!isString(literal) || !isInSet<V>(literal, this.#values)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public toLiteral(data: V): unknown {
    console.assert(isString(data) && isInSet<V>(data, this.#values));

    return data;
  }
}

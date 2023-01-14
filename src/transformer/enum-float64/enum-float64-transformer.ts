import {float64Decoder} from '../../coder/float64/float64-decoder.js';
import {float64Encode} from '../../coder/float64/float64-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {EnumDefinition} from '../../type/enum-definition.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {extractEnumValues} from '../../util/extract-enum-values.js';
import {isNumber} from '../../util/guard/is-number.js';
import {isInSet} from '../../util/is-in-set.js';
import {ValueTransformer} from '../value/value-transformer.js';

export class EnumFloat64Transformer<V extends number> extends ValueTransformer<
  V,
  V
> {
  public static fromDefinition<K extends string, V extends number>(
    definition: EnumDefinition<K, V>,
  ): EnumFloat64Transformer<V> {
    return new EnumFloat64Transformer<V>(extractEnumValues<K, V>(definition));
  }

  readonly #values: ReadonlySet<V>;

  private constructor(values: ReadonlySet<V>) {
    super();

    this.#values = values;
  }

  public compatibleWith(data: unknown): data is V {
    return isNumber(data) && isInSet<V>(data, this.#values);
  }

  public *decoder(): DecoderGenerator<V> {
    const value: number = yield* float64Decoder();

    if (!isInSet<V>(value, this.#values)) {
      throw new InvalidBufferValueError();
    }

    return value;
  }

  public encode(data: V): IterableEncoding {
    console.assert(isNumber(data) && isInSet<V>(data, this.#values));

    return float64Encode(data);
  }

  public fromLiteral(literal: unknown): V {
    if (!isNumber(literal) || !isInSet<V>(literal, this.#values)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public toLiteral(data: V): unknown {
    console.assert(isNumber(data) && isInSet<V>(data, this.#values));

    return data;
  }
}

import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import type {EnumDefinition} from '../../type/enum-definition';
import {extractEnumValues} from '../../util/extract-enum-values';
import {isNumber} from '../../util/guard/is-number';
import {isInSet} from '../../util/is-in-set';

export class EnumFloat64Transformer<V extends number> extends ValueTransformer<
  V,
  V
> {
  public static fromDefinition<K extends string, V extends number>(
    definition: EnumDefinition<K, V>,
  ): EnumFloat64Transformer<V> {
    return new EnumFloat64Transformer<V>(extractEnumValues<K, V>(definition));
  }

  private constructor(private readonly _values: ReadonlySet<V>) {
    super();
  }

  public compatibleWith(data: unknown): data is V {
    return isNumber(data) && isInSet<V>(data, this._values);
  }

  public fromLiteral(literal: unknown): V {
    if (!isNumber(literal) || !isInSet<V>(literal, this._values)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public toLiteral(data: V): unknown {
    console.assert(isNumber(data) && isInSet<V>(data, this._values));

    return data;
  }
}

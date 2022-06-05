import {ValueTransformer} from '../../base/value-transformer.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {EnumDefinition} from '../../type/enum-definition.js';
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

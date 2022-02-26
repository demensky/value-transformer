import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import type {EnumDefinition} from '../../type/enum-definition';
import type {EnumLike} from '../../type/enum-like';
import {extractEnumValues} from '../../util/extract-enum-values';

function isInSet<T>(value: unknown, set: ReadonlySet<T>): value is T {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return set.has(value as T);
}

export class EnumTransformer<V extends EnumLike> extends ValueTransformer<
  V,
  V
> {
  public static fromDefinition<K extends string, V extends EnumLike>(
    definition: EnumDefinition<K, V>,
  ): EnumTransformer<V> {
    return new EnumTransformer<V>(extractEnumValues<K, V>(definition));
  }

  private constructor(private readonly _values: ReadonlySet<V>) {
    super();
  }

  public compatibleWith(data: unknown): data is V {
    return isInSet<V>(data, this._values);
  }

  public fromLiteral(literal: unknown): V {
    if (!isInSet<V>(literal, this._values)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public toLiteral(data: V): unknown {
    console.assert(isInSet<V>(data, this._values));

    return data;
  }
}

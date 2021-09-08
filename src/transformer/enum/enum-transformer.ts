import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import type {EnumDefinition} from '../../type/enum-definition';
import type {EnumLike} from '../../type/enum-like';
import {extractEnumMap} from '../../util/extract-enum-map';

function isInSet<T>(value: unknown, set: ReadonlySet<T>): value is T {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return set.has(value as T);
}

export class EnumTransformer<
  K extends string,
  V extends EnumLike,
> extends ValueTransformer<V, V> {
  private readonly _values: ReadonlySet<V>;

  public constructor(definition: EnumDefinition<K, V>) {
    super();

    this._values = new Set<V>(extractEnumMap<K, V>(definition).values());
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
    return data;
  }
}

import {ValueTransformer} from '../base/value-transformer';

export class MapTransformer<K, V> extends ValueTransformer<Map<K, V>> {
  public constructor(
    private readonly _keyTransformer: ValueTransformer<K>,
    private readonly _valueTransformer: ValueTransformer<V>,
  ) {
    super();
  }

  public compatibleWith(_data: unknown): _data is Map<K, V> {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): Map<K, V> {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(data: ReadonlyMap<K, V>): unknown {
    return Array.from<readonly [K, V], readonly [unknown, unknown]>(
      data.entries(),
      ([key, value]) => [
        this._keyTransformer.toCompactLiteral(key),
        this._valueTransformer.toCompactLiteral(value),
      ],
    );
  }

  public toLiteral(data: ReadonlyMap<K, V>): unknown {
    return Array.from<readonly [K, V], readonly [unknown, unknown]>(
      data.entries(),
      ([key, value]) => [
        this._keyTransformer.toLiteral(key),
        this._valueTransformer.toLiteral(value),
      ],
    );
  }
}

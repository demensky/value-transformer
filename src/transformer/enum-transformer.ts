import {ValueTransformer} from '../base/value-transformer';

export class EnumTransformer<V> extends ValueTransformer<V> {
  public fromLiteral(_literal: unknown): V {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: V): unknown {
    throw new Error('Not implemented');
  }
}

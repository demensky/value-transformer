import {ValueTransformer} from '../base/value-transformer';

export class EnumTransformer<V> extends ValueTransformer<V> {
  public toLiteral(_data: V): unknown {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): V {
    throw new Error('Not implemented');
  }
}

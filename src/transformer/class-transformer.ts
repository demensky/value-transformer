import {ValueTransformer} from '../base/value-transformer';

export class ClassTransformer<T> extends ValueTransformer<T> {
  public compatibleWith(_data: unknown): _data is T {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): T {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(_data: T): unknown {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: T): unknown {
    throw new Error('Not implemented');
  }
}

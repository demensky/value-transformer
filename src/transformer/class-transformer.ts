import {ValueTransformer} from '../base/value-transformer';

export class ClassTransformer<T extends object> extends ValueTransformer<T> {
  public toLiteral(_data: T): unknown {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(_data: T): unknown {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): T {
    throw new Error('Not implemented');
  }
}

import {ValueTransformer} from '../base/value-transformer';

export class OneOfTransformer<T> extends ValueTransformer<T> {
  public constructor(_transformers: readonly ValueTransformer<T>[]) {
    super();
  }

  public toLiteral(_data: T): unknown {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): T {
    throw new Error('Not implemented');
  }
}

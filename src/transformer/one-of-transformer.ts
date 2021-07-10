import {ValueTransformer} from '../base/value-transformer';

export class OneOfTransformer<T> extends ValueTransformer<T> {
  public constructor(_transformers: readonly ValueTransformer<T>[]) {
    super();
  }

  public compatibleWith(_data: unknown): _data is T {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): T {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: T): unknown {
    throw new Error('Not implemented');
  }
}

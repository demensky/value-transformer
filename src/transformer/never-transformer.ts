import {ValueTransformer} from '../base/value-transformer';

export class NeverTransformer extends ValueTransformer<never> {
  public toLiteral(_data: never): unknown {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): never {
    throw new Error('Not implemented');
  }
}

import {ValueTransformer} from '../base/value-transformer';

export class NeverTransformer extends ValueTransformer<never, never> {
  public compatibleWith(_data: unknown): _data is never {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): never {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: never): unknown {
    throw new Error('Not implemented');
  }
}

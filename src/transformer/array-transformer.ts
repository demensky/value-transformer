import {ValueTransformer} from '../base/value-transformer';

export class ArrayTransformer<T> extends ValueTransformer<readonly T[]> {
  public constructor(_transformer: ValueTransformer<T>) {
    super();
  }

  public compatibleWith(_data: unknown): _data is readonly T[] {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): T[] {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: readonly T[]): unknown {
    throw new Error('Not implemented');
  }
}

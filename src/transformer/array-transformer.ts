import {ValueTransformer} from '../base/value-transformer';

export class ArrayTransformer<T> extends ValueTransformer<readonly T[]> {
  public constructor(private readonly _transformer: ValueTransformer<T>) {
    super();
  }

  public fromLiteral(_literal: unknown): T[] {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: readonly T[]): unknown {
    throw new Error('Not implemented');
  }
}

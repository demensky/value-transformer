import {ValueTransformer} from '../base/value-transformer';

export class ArrayTransformer<I, O extends I> extends ValueTransformer<
  readonly I[],
  O[]
> {
  public constructor(_transformer: ValueTransformer<I, O>) {
    super();
  }

  public compatibleWith(_data: unknown): _data is readonly I[] {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): O[] {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: readonly I[]): unknown {
    throw new Error('Not implemented');
  }
}

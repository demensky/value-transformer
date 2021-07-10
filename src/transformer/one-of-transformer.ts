import {ValueTransformer} from '../base/value-transformer';

export class OneOfTransformer<I, O extends I> extends ValueTransformer<I, O> {
  public constructor(_transformers: readonly ValueTransformer<I, O>[]) {
    super();
  }

  public compatibleWith(_data: unknown): _data is I {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): O {
    throw new Error('Not implemented');
  }

  public toLiteral(_data: I): unknown {
    throw new Error('Not implemented');
  }
}

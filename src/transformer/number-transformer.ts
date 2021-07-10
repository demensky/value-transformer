import {ValueTransformer} from '../base/value-transformer';

const ONE_BYTE_MASK = 0xff;

export class NumberTransformer extends ValueTransformer<number> {
  public fromLiteral(_literal: unknown): number {
    throw new Error('Not implemented');
  }

  public toLiteral(data: number): unknown {
    return data & ONE_BYTE_MASK;
  }
}

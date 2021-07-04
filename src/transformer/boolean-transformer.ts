import {ValueTransformer} from '../base/value-transformer';

const TRUE_COMPACT = 1;

const FALSE_COMPACT = 0;

export class BooleanTransformer extends ValueTransformer<boolean> {
  public toLiteral(data: boolean): unknown {
    return data;
  }

  public override toCompactLiteral(data: boolean): unknown {
    return data ? TRUE_COMPACT : FALSE_COMPACT;
  }

  public fromLiteral(_literal: unknown): boolean {
    throw new Error('Not implemented');
  }
}

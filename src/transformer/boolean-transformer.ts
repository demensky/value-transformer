import {ValueTransformer} from '../base/value-transformer';
import {identity} from '../util/identity';

const TRUE_COMPACT = 1;

const FALSE_COMPACT = 0;

type BooleanCompactLiteral = typeof FALSE_COMPACT | typeof TRUE_COMPACT;

export class BooleanTransformer extends ValueTransformer<boolean, boolean> {
  public compatibleWith(_data: unknown): _data is boolean {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): boolean {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral(data: boolean): unknown {
    return identity<BooleanCompactLiteral>(data ? TRUE_COMPACT : FALSE_COMPACT);
  }

  public toLiteral(data: boolean): unknown {
    return data;
  }
}

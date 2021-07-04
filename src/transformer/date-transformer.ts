import {ValueTransformer} from '../base/value-transformer';
import {isInvalidDate} from '../util/is-invalid-date';

const INVALID_COMPACT = '?';

const INVALID = 'Invalid Date';

export class DateTransformer extends ValueTransformer<Date> {
  public toLiteral(data: Date): unknown {
    return isInvalidDate(data) ? INVALID : data.toISOString();
  }

  public override toCompactLiteral(data: Date): unknown {
    return isInvalidDate(data) ? INVALID_COMPACT : data.getTime();
  }

  public fromLiteral(_literal: unknown): Date {
    throw new Error('Not implemented');
  }
}

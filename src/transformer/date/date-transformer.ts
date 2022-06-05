import {ValueTransformer} from '../../base/value-transformer.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {isDate} from '../../util/guard/is-date.js';
import {isInvalidDate} from '../../util/guard/is-invalid-date.js';
import {isNumberOrString} from '../../util/guard/is-number-or-string.js';

const INVALID = 'Invalid Date';

// TODO ReadonlyDate
/**
 * Handles a {@link Date} object (including "Invalid Date").
 * @see {@link asDate} alias
 */
export class DateTransformer extends ValueTransformer<Date, Date> {
  public constructor() {
    super();
  }

  public compatibleWith(data: unknown): data is Date {
    return isDate(data);
  }

  public fromLiteral(literal: unknown): Date {
    if (literal === INVALID) {
      return new Date(NaN);
    }

    if (!isNumberOrString(literal)) {
      throw new IncompatibleLiteralError();
    }

    const date = new Date(literal);

    if (isInvalidDate(date)) {
      throw new IncompatibleLiteralError();
    }

    return date;
  }

  public override toCompactLiteral(data: Date): unknown {
    console.assert(isDate(data));

    return isInvalidDate(data) ? INVALID : data.getTime();
  }

  public toLiteral(data: Date): unknown {
    console.assert(isDate(data));

    return isInvalidDate(data) ? INVALID : data.toISOString();
  }
}

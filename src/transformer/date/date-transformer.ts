import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {dateDecoder} from '../../representation/date/date-decoder';
import {dateEncode} from '../../representation/date/date-encode';
import type {DecoderGenerator} from '../../type/decoder-generator';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {isDate} from '../../util/guard/is-date';
import {isInvalidDate} from '../../util/guard/is-invalid-date';
import {isNumberOrString} from '../../util/guard/is-number-or-string';

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

  public decoder(): DecoderGenerator<Date> {
    return dateDecoder();
  }

  public encode(data: Date): IterableEncoding {
    console.assert(isDate(data));

    return dateEncode(data);
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

import {ValueTransformer} from '../../base/value-transformer.js';
import {dateDecoder} from '../../coder/date/date-decoder.js';
import {dateEncode} from '../../coder/date/date-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
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

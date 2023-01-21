import {dateDecoder} from '../../coder/date/date-decoder.js';
import {dateEncode} from '../../coder/date/date-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import type {ReadonlyDate} from '../../type/readonly-date.js';
import {isDate} from '../../util/guard/is-date.js';
import {isInvalidDate} from '../../util/guard/is-invalid-date.js';
import {isNumberOrString} from '../../util/guard/is-number-or-string.js';
import {ValueTransformer} from '../value/value-transformer.js';

const INVALID = 'Invalid Date';

/**
 * Handles a {@link Date} object (including "Invalid Date").
 *
 * @see {@link asDate} alias.
 */
export class DateTransformer extends ValueTransformer<ReadonlyDate, Date> {
  public constructor() {
    super();
  }

  public compatibleWith(data: unknown): data is ReadonlyDate {
    return isDate(data);
  }

  public decoder(): DecoderGenerator<Date> {
    return dateDecoder();
  }

  public encode(data: ReadonlyDate): IterableEncoding {
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

  public toLiteral(data: ReadonlyDate, compact: boolean): unknown {
    console.assert(isDate(data));

    if (isInvalidDate(data)) {
      return INVALID;
    }

    return compact ? data.getTime() : data.toISOString();
  }
}

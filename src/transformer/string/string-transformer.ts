import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error';
import {isString} from '../../util/guard/is-string';
import {isValidUnicode} from '../../util/guard/is-valid-unicode';

/**
 * @see {@link asString} alias
 */
export class StringTransformer extends ValueTransformer<string, string> {
  public constructor() {
    super();
  }

  public compatibleWith(data: unknown): data is string {
    return isString(data);
  }

  public fromLiteral(literal: unknown): string {
    if (!isString(literal)) {
      throw new IncompatibleLiteralError('only strings are supported');
    }

    return literal;
  }

  public toLiteral(data: string): unknown {
    console.assert(isString(data));

    if (!isValidUnicode(data)) {
      throw new InvalidUnicodeError();
    }

    return data;
  }
}

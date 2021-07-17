import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {isString} from '../../util/is-string';

export class StringTransformer extends ValueTransformer<string, string> {
  public compatibleWith(data: unknown): data is string {
    return isString(data);
  }

  public fromLiteral(literal: unknown): string {
    if (!isString(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public toLiteral(data: string): unknown {
    return data;
  }
}
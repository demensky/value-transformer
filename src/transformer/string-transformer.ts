import {ValueTransformer} from '../base/value-transformer';
import {IncompatibleLiteralError} from '../error/incompatible-literal-error';

export class StringTransformer extends ValueTransformer<string, string> {
  public compatibleWith(data: unknown): data is string {
    return typeof data === 'string';
  }

  public fromLiteral(literal: unknown): string {
    if (typeof literal !== 'string') {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public toLiteral(data: string): unknown {
    return data;
  }
}

import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import type {UuidString} from '../../type/uuid-string';
import {isString} from '../../util/guard/is-string';
import {isUuidString} from '../../util/guard/is-uuid-string';

export class UuidStringTransformer<
  T extends UuidString,
> extends ValueTransformer<T, T> {
  public compatibleWith(data: unknown): data is T {
    return isString(data) && isUuidString<T>(data);
  }

  public fromLiteral(literal: unknown): T {
    if (!isString(literal)) {
      throw new IncompatibleLiteralError('only strings are supported');
    }

    if (!isUuidString<T>(literal)) {
      throw new IncompatibleLiteralError('string must be uuid in dash-case');
    }

    return literal;
  }

  public toLiteral(data: T): unknown {
    console.assert(isString(data) && isUuidString<T>(data));

    return data;
  }
}

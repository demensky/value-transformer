import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {identity} from '../../util/identity';
import {isBoolean} from '../../util/is-boolean';

const TRUE_COMPACT = 1;

const FALSE_COMPACT = 0;

type BooleanCompactLiteral = typeof FALSE_COMPACT | typeof TRUE_COMPACT;

/**
 * @see {@link asBoolean} alias
 */
export class BooleanTransformer extends ValueTransformer<boolean, boolean> {
  public compatibleWith(data: unknown): data is boolean {
    return isBoolean(data);
  }

  public fromLiteral(literal: unknown): boolean {
    switch (literal) {
      case TRUE_COMPACT:
      case true:
        return true;
      case FALSE_COMPACT:
      case false:
        return false;
    }

    throw new IncompatibleLiteralError(
      'supported values are true, false, 1, and 0',
    );
  }

  public override toCompactLiteral(data: boolean): unknown {
    return identity<BooleanCompactLiteral>(data ? TRUE_COMPACT : FALSE_COMPACT);
  }

  public toLiteral(data: boolean): unknown {
    return data;
  }
}

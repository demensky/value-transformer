import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {isBigInt} from '../../util/guard/is-big-int';
import {isDecimalIntString} from '../../util/guard/is-decimal-int-string';
import {isString} from '../../util/guard/is-string';

/**
 * Handles a bigint (value is unlimited in 64 bits).
 * @see {@link asBigInt} alias
 */
export class BigIntTransformer extends ValueTransformer<bigint, bigint> {
  public compatibleWith(data: unknown): data is bigint {
    return isBigInt(data);
  }

  public fromLiteral(literal: unknown): bigint {
    if (!isString(literal)) {
      throw new IncompatibleLiteralError('Literal must be a string');
    }

    if (!isDecimalIntString(literal)) {
      throw new IncompatibleLiteralError(
        'Literal must contain only one optional minus and decimal digits',
      );
    }

    return BigInt(literal);
  }

  public toLiteral(data: bigint): unknown {
    return data.toString();
  }
}

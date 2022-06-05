import {ValueTransformer} from '../../base/value-transformer.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {isBigInt} from '../../util/guard/is-big-int.js';
import {isDecimalIntString} from '../../util/guard/is-decimal-int-string.js';
import {isString} from '../../util/guard/is-string.js';

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
    console.assert(isBigInt(data));

    return data.toString();
  }
}

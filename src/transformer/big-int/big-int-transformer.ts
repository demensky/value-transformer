import {bigIntDecoder} from '../../coder/big-int/big-int-decoder.js';
import {bigIntEncode} from '../../coder/big-int/big-int-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isBigInt} from '../../util/guard/is-big-int.js';
import {isDecimalIntString} from '../../util/guard/is-decimal-int-string.js';
import {isString} from '../../util/guard/is-string.js';
import {ValueTransformer} from '../value/value-transformer.js';

/**
 * Handles a bigint (value is unlimited in 64 bits).
 *
 * @see {@link asBigInt} alias.
 */
export class BigIntTransformer extends ValueTransformer<bigint, bigint> {
  public compatibleWith(data: unknown): data is bigint {
    return isBigInt(data);
  }

  public decoder(): DecoderGenerator<bigint> {
    return bigIntDecoder();
  }

  public encode(data: bigint): IterableEncoding {
    console.assert(isBigInt(data));

    return bigIntEncode(data);
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

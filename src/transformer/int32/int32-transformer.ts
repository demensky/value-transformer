import {int32Decoder} from '../../coder/int32/int32-decoder.js';
import {int32Encoder} from '../../coder/int32/int32-encoder.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {isInt32} from '../../util/guard/is-int32.js';
import {isNumber} from '../../util/guard/is-number.js';
import {ValueTransformer} from '../value/value-transformer.js';

/**
 * @see {@link asInt32} alias.
 */
export class Int32Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isInt32(data);
  }

  public decoder(): Decoding<number> {
    return int32Decoder();
  }

  public encoder(data: number): Encoding {
    console.assert(isNumber(data));

    return int32Encoder(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isInt32(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isNumber(data) && isInt32(data));

    return data;
  }
}

import {int16Decoder} from '../../coder/int16/int16-decoder.js';
import {int16Encoder} from '../../coder/int16/int16-encoder.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {isInt16} from '../../util/guard/is-int16.js';
import {isNumber} from '../../util/guard/is-number.js';
import {ValueTransformer} from '../value/value-transformer.js';

/**
 * @see {@link asInt16} alias.
 */
export class Int16Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isInt16(data);
  }

  public decoder(): Decoding<number> {
    return int16Decoder();
  }

  public encoder(data: number): Encoding {
    console.assert(isNumber(data));

    return int16Encoder(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isInt16(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isNumber(data) && isInt16(data));

    return data;
  }
}

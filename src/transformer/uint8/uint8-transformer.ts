import {uint8Decoder} from '../../coder/uint8/uint8-decoder.js';
import {uint8Encoder} from '../../coder/uint8/uint8-encoder.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {isNumber} from '../../util/guard/is-number.js';
import {isUint8} from '../../util/guard/is-uint8.js';
import {ValueTransformer} from '../value/value-transformer.js';

/**
 * @see {@link asUint8} alias.
 */
export class Uint8Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isUint8(data);
  }

  public decoder(): Decoding<number> {
    return uint8Decoder();
  }

  public encoder(data: number): Encoding {
    console.assert(isNumber(data));

    return uint8Encoder(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isUint8(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isNumber(data) && isUint8(data));

    return data;
  }
}

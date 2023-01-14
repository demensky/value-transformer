import {int8Decoder} from '../../coder/int8/int8-decoder.js';
import {int8Encode} from '../../coder/int8/int8-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isInt8} from '../../util/guard/is-int8.js';
import {isNumber} from '../../util/guard/is-number.js';
import {ValueTransformer} from '../value/value-transformer.js';

/**
 * @see {@link asInt8} alias
 */
export class Int8Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isInt8(data);
  }

  public decoder(): DecoderGenerator<number> {
    return int8Decoder();
  }

  public encode(data: number): IterableEncoding {
    console.assert(isNumber(data));

    return int8Encode(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isInt8(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isNumber(data) && isInt8(data));

    return data;
  }
}

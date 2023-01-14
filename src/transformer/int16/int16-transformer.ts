import {ValueTransformer} from '../../base/value-transformer.js';
import {int16Decoder} from '../../coder/int16/int16-decoder.js';
import {int16Encode} from '../../coder/int16/int16-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isInt16} from '../../util/guard/is-int16.js';
import {isNumber} from '../../util/guard/is-number.js';

/**
 * @see {@link asInt16} alias
 */
export class Int16Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isInt16(data);
  }

  public decoder(): DecoderGenerator<number> {
    return int16Decoder();
  }

  public encode(data: number): IterableEncoding {
    console.assert(isNumber(data));

    return int16Encode(data);
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

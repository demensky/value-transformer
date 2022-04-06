import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {int16Decoder} from '../../representation/int16/int16-decoder';
import {int16Encode} from '../../representation/int16/int16-encode';
import type {DecoderGenerator} from '../../type/decoder-generator';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {isInt16} from '../../util/guard/is-int16';
import {isNumber} from '../../util/guard/is-number';

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
    console.assert(isInt16(data));

    return int16Encode(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isInt16(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isInt16(data));

    return data;
  }
}

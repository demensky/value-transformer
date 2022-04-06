import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {int8Decoder} from '../../representation/int8/int8-decoder';
import {int8Encode} from '../../representation/int8/int8-encode';
import type {DecoderGenerator} from '../../type/decoder-generator';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {isInt8} from '../../util/guard/is-int8';
import {isNumber} from '../../util/guard/is-number';

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
    console.assert(isInt8(data));

    return int8Encode(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isInt8(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isInt8(data));

    return data;
  }
}

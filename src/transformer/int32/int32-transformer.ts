import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {int32Decoder} from '../../representation/int32/int32-decoder';
import {int32Encode} from '../../representation/int32/int32-encode';
import type {DecoderGenerator} from '../../type/decoder-generator';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {isInt32} from '../../util/guard/is-int32';
import {isNumber} from '../../util/guard/is-number';

/**
 * @see {@link asInt32} alias
 */
export class Int32Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isInt32(data);
  }

  public decoder(): DecoderGenerator<number> {
    return int32Decoder();
  }

  public encode(data: number): IterableEncoding {
    console.assert(isInt32(data));

    return int32Encode(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isInt32(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isInt32(data));

    return data;
  }
}
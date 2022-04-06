import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {uint16Decoder} from '../../representation/uint16/uint16-decoder';
import {uint16Encode} from '../../representation/uint16/uint16-encode';
import type {DecoderGenerator} from '../../type/decoder-generator';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {isNumber} from '../../util/guard/is-number';
import {isUint16} from '../../util/guard/is-uint16';

/**
 * @see {@link asUint16} alias
 */
export class Uint16Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isUint16(data);
  }

  public decoder(): DecoderGenerator<number> {
    return uint16Decoder();
  }

  public encode(data: number): IterableEncoding {
    console.assert(isUint16(data));

    return uint16Encode(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isUint16(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isUint16(data));

    return data;
  }
}

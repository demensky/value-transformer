import {uint16Decoder} from '../../coder/uint16/uint16-decoder.js';
import {uint16Encode} from '../../coder/uint16/uint16-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isNumber} from '../../util/guard/is-number.js';
import {isUint16} from '../../util/guard/is-uint16.js';
import {ValueTransformer} from '../value/value-transformer.js';

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
    console.assert(isNumber(data));

    return uint16Encode(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isUint16(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isNumber(data) && isUint16(data));

    return data;
  }
}

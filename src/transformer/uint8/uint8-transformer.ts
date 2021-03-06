import {ValueTransformer} from '../../base/value-transformer.js';
import {uint8Decoder} from '../../coder/uint8/uint8-decoder.js';
import {uint8Encode} from '../../coder/uint8/uint8-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isNumber} from '../../util/guard/is-number.js';
import {isUint8} from '../../util/guard/is-uint8.js';

/**
 * @see {@link asUint8} alias
 */
export class Uint8Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isUint8(data);
  }

  public decoder(): DecoderGenerator<number> {
    return uint8Decoder();
  }

  public encode(data: number): IterableEncoding {
    console.assert(isUint8(data));

    return uint8Encode(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isUint8(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isUint8(data));

    return data;
  }
}

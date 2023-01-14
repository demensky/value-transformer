import {ValueTransformer} from '../../base/value-transformer.js';
import {uint32Decoder} from '../../coder/uint32/uint32-decoder.js';
import {uint32Encode} from '../../coder/uint32/uint32-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isNumber} from '../../util/guard/is-number.js';
import {isUint32} from '../../util/guard/is-uint32.js';

/**
 * @see {@link asUint32} alias
 */
export class Uint32Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public override compatibleWith(data: unknown): data is number {
    return isNumber(data) && isUint32(data);
  }

  public decoder(): DecoderGenerator<number> {
    return uint32Decoder();
  }

  public encode(data: number): IterableEncoding {
    console.assert(isNumber(data));

    return uint32Encode(data);
  }

  public fromLiteral(literal: unknown): number {
    if (!isNumber(literal) || !isUint32(literal)) {
      throw new IncompatibleLiteralError();
    }

    return literal;
  }

  public override toLiteral(data: number): unknown {
    console.assert(isNumber(data) && isUint32(data));

    return data;
  }
}

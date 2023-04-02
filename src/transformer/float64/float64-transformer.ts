import {float64Decoder} from '../../coder/float64/float64-decoder.js';
import {float64Encoder} from '../../coder/float64/float64-encoder.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {isNumber} from '../../util/guard/is-number.js';
import {ValueTransformer} from '../value/value-transformer.js';

const NAN_LITERAL_VALUE = 'NaN';

const POSITIVE_INFINITY_LITERAL_VALUE = 'Infinity';

const NEGATIVE_INFINITY_LITERAL_VALUE = '-Infinity';

const NEGATIVE_ZERO_LITERAL_VALUE = '-0';

/**
 * Handles a primitive number (including `NaN`, `Infinity`, `-Infinity`, `-0`).
 *
 * @see {@link asFloat64} alias.
 */
export class Float64Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public compatibleWith(data: unknown): data is number {
    return isNumber(data);
  }

  public decoder(): Decoding<number> {
    return float64Decoder();
  }

  public encoder(data: number): Encoding {
    console.assert(isNumber(data));

    return float64Encoder(data);
  }

  public fromLiteral(literal: unknown): number {
    switch (literal) {
      case NAN_LITERAL_VALUE:
        return NaN;
      case POSITIVE_INFINITY_LITERAL_VALUE:
        return Infinity;
      case NEGATIVE_INFINITY_LITERAL_VALUE:
        return -Infinity;
      case NEGATIVE_ZERO_LITERAL_VALUE:
        return -0;
    }

    if (!isNumber(literal)) {
      throw new IncompatibleLiteralError(
        "only 'NaN', 'Infinity', '-Infinity', '-0' & numbers are supported",
      );
    }

    return literal;
  }

  public toLiteral(data: number): unknown {
    console.assert(isNumber(data));

    if (Number.isNaN(data)) {
      return NAN_LITERAL_VALUE;
    }

    if (data === Infinity) {
      return POSITIVE_INFINITY_LITERAL_VALUE;
    }

    if (data === -Infinity) {
      return NEGATIVE_INFINITY_LITERAL_VALUE;
    }

    if (Object.is(data, -0)) {
      return NEGATIVE_ZERO_LITERAL_VALUE;
    }

    return data;
  }
}

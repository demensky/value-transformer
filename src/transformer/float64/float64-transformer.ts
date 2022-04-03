import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {isNumber} from '../../util/guard/is-number';

const NAN_LITERAL_VALUE = 'NaN';

const POSITIVE_INFINITY_LITERAL_VALUE = 'Infinity';

const NEGATIVE_INFINITY_LITERAL_VALUE = '-Infinity';

/**
 * Handles a primitive number (including `NaN`, `Infinity` and `-Infinity`).
 * @see {@link asFloat64} alias
 */
export class Float64Transformer extends ValueTransformer<number, number> {
  public constructor() {
    super();
  }

  public compatibleWith(data: unknown): data is number {
    return isNumber(data);
  }

  public fromLiteral(literal: unknown): number {
    switch (literal) {
      case NAN_LITERAL_VALUE:
        return NaN;
      case POSITIVE_INFINITY_LITERAL_VALUE:
        return Infinity;
      case NEGATIVE_INFINITY_LITERAL_VALUE:
        return -Infinity;
    }

    if (!isNumber(literal)) {
      throw new IncompatibleLiteralError(
        "only 'NaN', 'Infinity', '-Infinity' & numbers are supported",
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

    return data;
  }
}

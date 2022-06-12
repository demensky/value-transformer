import {ValueTransformer} from '../../base/value-transformer.js';
import {booleanDecoder} from '../../coder/boolean/boolean-decoder.js';
import {booleanEncode} from '../../coder/boolean/boolean-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isBoolean} from '../../util/guard/is-boolean.js';
import {identity} from '../../util/identity.js';

const TRUE_COMPACT = 1;

const FALSE_COMPACT = 0;

type BooleanCompactLiteral = typeof FALSE_COMPACT | typeof TRUE_COMPACT;

/**
 * @see {@link asBoolean} alias
 */
export class BooleanTransformer extends ValueTransformer<boolean, boolean> {
  public constructor() {
    super();
  }

  public compatibleWith(data: unknown): data is boolean {
    return isBoolean(data);
  }

  public decoder(): DecoderGenerator<boolean> {
    return booleanDecoder();
  }

  public encode(data: boolean): IterableEncoding {
    console.assert(isBoolean(data));

    return booleanEncode(data);
  }

  public fromLiteral(literal: unknown): boolean {
    switch (literal) {
      case TRUE_COMPACT:
      case true:
        return true;
      case FALSE_COMPACT:
      case false:
        return false;
    }

    throw new IncompatibleLiteralError(
      'supported values are true, false, 1, and 0',
    );
  }

  public override toCompactLiteral(data: boolean): unknown {
    console.assert(isBoolean(data));

    return identity<BooleanCompactLiteral>(data ? TRUE_COMPACT : FALSE_COMPACT);
  }

  public toLiteral(data: boolean): unknown {
    console.assert(isBoolean(data));

    return data;
  }
}

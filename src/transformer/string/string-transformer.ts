import {stringDecoder} from '../../coder/string/string-decoder.js';
import {stringEncoder} from '../../coder/string/string-encoder.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {Encoding} from '../../type/encoding.js';
import {isString} from '../../util/guard/is-string.js';
import {isWellFormed} from '../../util/is-well-formed.js';
import {ValueTransformer} from '../value/value-transformer.js';

/**
 * @see {@link asString} alias.
 */
export class StringTransformer extends ValueTransformer<string, string> {
  public constructor() {
    super();
  }

  public compatibleWith(data: unknown): data is string {
    return isString(data);
  }

  public decoder(): Decoding<string> {
    return stringDecoder();
  }

  public encoder(data: string): Encoding {
    console.assert(isString(data));

    return stringEncoder(data);
  }

  public fromLiteral(literal: unknown): string {
    if (!isString(literal)) {
      throw new IncompatibleLiteralError('only strings are supported');
    }

    return literal;
  }

  public toLiteral(data: string): unknown {
    console.assert(isString(data));

    if (!isWellFormed(data)) {
      throw new InvalidUnicodeError();
    }

    return data;
  }
}

import {stringDecoder} from '../../coder/string/string-decoder.js';
import {stringEncode} from '../../coder/string/string-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import {isString} from '../../util/guard/is-string.js';
import {isValidUnicode} from '../../util/guard/is-valid-unicode.js';
import {ValueTransformer} from '../value/value-transformer.js';

/**
 * @see {@link asString} alias
 */
export class StringTransformer extends ValueTransformer<string, string> {
  public constructor() {
    super();
  }

  public compatibleWith(data: unknown): data is string {
    return isString(data);
  }

  public decoder(): DecoderGenerator<string> {
    return stringDecoder();
  }

  public encode(data: string): IterableEncoding {
    console.assert(isString(data));

    return stringEncode(data);
  }

  public fromLiteral(literal: unknown): string {
    if (!isString(literal)) {
      throw new IncompatibleLiteralError('only strings are supported');
    }

    return literal;
  }

  public toLiteral(data: string): unknown {
    console.assert(isString(data));

    if (!isValidUnicode(data)) {
      throw new InvalidUnicodeError();
    }

    return data;
  }
}

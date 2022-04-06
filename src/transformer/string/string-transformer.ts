import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error';
import {stringDecoder} from '../../representation/string/string-decoder';
import {stringEncode} from '../../representation/string/string-encode';
import type {DecoderGenerator} from '../../type/decoder-generator';
import type {IterableEncoding} from '../../type/iterable-encoding';
import {isString} from '../../util/guard/is-string';
import {isValidUnicode} from '../../util/guard/is-valid-unicode';

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

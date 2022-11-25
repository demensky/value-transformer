import {ValueTransformer} from '../../base/value-transformer.js';
import {regExpDecoder} from '../../coder/reg-exp/reg-exp-decoder.js';
import {regExpEncode} from '../../coder/reg-exp/reg-exp-encode.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import type {Unverified} from '../../type/unverified.js';
import {isArray} from '../../util/guard/is-array.js';
import {isEntry} from '../../util/guard/is-entry.js';
import {isObject} from '../../util/guard/is-object.js';
import {isRegExp} from '../../util/guard/is-reg-exp.js';
import {isString} from '../../util/guard/is-string.js';
import {isValidUnicode} from '../../util/guard/is-valid-unicode.js';

type RegExpLiteral =
  | readonly [source: string, flags: string]
  | {readonly source: string; readonly flags: string};

// TODO ReadonlyRegExp
export class RegExpTransformer extends ValueTransformer<RegExp, RegExp> {
  public compatibleWith(data: unknown): data is RegExp {
    return isRegExp(data);
  }

  public decoder(): DecoderGenerator<RegExp> {
    return regExpDecoder();
  }

  public encode(data: RegExp): IterableEncoding {
    console.assert(isRegExp(data));

    return regExpEncode(data);
  }

  public fromLiteral(literal: unknown): RegExp {
    if (!isObject(literal)) {
      throw new IncompatibleLiteralError();
    }

    let source: unknown;
    let flags: unknown;

    const unverifiedLiteral: Unverified<RegExpLiteral> = literal;

    if (isArray(unverifiedLiteral)) {
      if (!isEntry(unverifiedLiteral)) {
        throw new IncompatibleLiteralError();
      }

      [source, flags] = unverifiedLiteral;
    } else {
      ({source, flags} = unverifiedLiteral);
    }

    if (!isString(source) || !isString(flags)) {
      throw new IncompatibleLiteralError();
    }

    return new RegExp(source, flags);
  }

  public toLiteral(data: RegExp, compact: boolean): unknown {
    console.assert(isRegExp(data));

    const {flags, source}: RegExp = data;

    if (!isValidUnicode(source)) {
      throw new InvalidUnicodeError('source');
    }

    if (!isValidUnicode(flags)) {
      throw new InvalidUnicodeError('flags');
    }

    return (
      compact ? [source, flags] : {source, flags}
    ) satisfies RegExpLiteral;
  }
}

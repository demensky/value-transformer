import {ValueTransformer} from '../../base/value-transformer.js';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {regExpDecoder} from '../../representation/reg-exp/reg-exp-decoder.js';
import {regExpEncode} from '../../representation/reg-exp/reg-exp-encode.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {IterableEncoding} from '../../type/iterable-encoding.js';
import type {UnverifiedObject} from '../../type/unverified-object.js';
import {isArray} from '../../util/guard/is-array.js';
import {isEntry} from '../../util/guard/is-entry.js';
import {isObject} from '../../util/guard/is-object.js';
import {isRegExp} from '../../util/guard/is-reg-exp.js';
import {isString} from '../../util/guard/is-string.js';
import {isValidUnicode} from '../../util/guard/is-valid-unicode.js';
import {identity} from '../../util/identity.js';

interface RegExpLiteral {
  readonly source: string;

  readonly flags: string;
}

type RegExpCompactLiteral = readonly [source: string, flags: string];

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

    if (isArray(literal)) {
      if (!isEntry(literal)) {
        throw new IncompatibleLiteralError();
      }

      [source, flags] = literal;
    } else {
      source = identity<UnverifiedObject<RegExpLiteral>>(literal).source;
      flags = identity<UnverifiedObject<RegExpLiteral>>(literal).flags;
    }

    if (!isString(source) || !isString(flags)) {
      throw new IncompatibleLiteralError();
    }

    return new RegExp(source, flags);
  }

  public override toCompactLiteral(data: RegExp): unknown {
    console.assert(isRegExp(data));

    const {flags, source}: RegExp = data;

    if (!isValidUnicode(source)) {
      throw new InvalidUnicodeError('source');
    }

    if (!isValidUnicode(flags)) {
      throw new InvalidUnicodeError('flags');
    }

    return identity<RegExpCompactLiteral>([source, flags]);
  }

  public toLiteral(data: RegExp): unknown {
    console.assert(isRegExp(data));

    const {flags, source}: RegExp = data;

    if (!isValidUnicode(source)) {
      throw new InvalidUnicodeError('source');
    }

    if (!isValidUnicode(flags)) {
      throw new InvalidUnicodeError('flags');
    }

    return identity<RegExpLiteral>({source, flags});
  }
}

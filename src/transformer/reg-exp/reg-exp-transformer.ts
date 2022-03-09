import {ValueTransformer} from '../../base/value-transformer';
import {IncompatibleLiteralError} from '../../error/incompatible-literal-error';
import type {UnverifiedObject} from '../../type/unverified-object';
import {isArray} from '../../util/guard/is-array';
import {isEntry} from '../../util/guard/is-entry';
import {isObject} from '../../util/guard/is-object';
import {isRegExp} from '../../util/guard/is-reg-exp';
import {isString} from '../../util/guard/is-string';
import {identity} from '../../util/identity';

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

    return identity<RegExpCompactLiteral>([data.source, data.flags]);
  }

  public toLiteral(data: RegExp): unknown {
    console.assert(isRegExp(data));

    return identity<RegExpLiteral>({source: data.source, flags: data.flags});
  }
}

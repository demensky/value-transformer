import {ValueTransformer} from '../base/value-transformer';
import {identity} from '../util/identity';

interface RegExpLiteral {
  readonly source: string;

  readonly flags: string;
}

type RegExpCompactLiteral = readonly [source: string, flags: string];

// TODO ReadonlyRegExp
export class RegExpTransformer extends ValueTransformer<RegExp, RegExp> {
  public compatibleWith(_data: unknown): _data is RegExp {
    throw new Error('Not implemented');
  }

  public fromLiteral(_literal: unknown): RegExp {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral({source, flags}: RegExp): unknown {
    return identity<RegExpCompactLiteral>([source, flags]);
  }

  public toLiteral({source, flags}: RegExp): unknown {
    return identity<RegExpLiteral>({source, flags});
  }
}

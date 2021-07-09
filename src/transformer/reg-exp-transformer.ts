import {ValueTransformer} from '../base/value-transformer';

interface RegExpLiteral {
  readonly source: string;

  readonly flags: string;
}

type RegExpCompactLiteral = readonly [source: string, flags: string];

export class RegExpTransformer extends ValueTransformer<RegExp> {
  public fromLiteral(_literal: unknown): RegExp {
    throw new Error('Not implemented');
  }

  public override toCompactLiteral({source, flags}: RegExp): unknown {
    const result: RegExpCompactLiteral = [source, flags];
    return result;
  }

  public toLiteral({source, flags}: RegExp): unknown {
    const result: RegExpLiteral = {source, flags};
    return result;
  }
}
